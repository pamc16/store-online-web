import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, message } from 'antd';
import { type RcFile, type UploadFile } from 'antd/es/upload';
import { storage, store } from 'firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import './upload-photo.css';

interface UploadPhotoProps {
	onPhotoUploaded: (photo: { description: string; url: string }) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onPhotoUploaded }) => {
	const [form] = Form.useForm();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState<boolean>(false);
	const handleCustomRequest = async (options: {
		file: RcFile;
		onSuccess: (file: UploadFile<any>) => void;
	}) => {
		const { file, onSuccess } = options;
		const storageRef = ref(storage, `images/${file.name}`);

		try {
			// subir imagen a Firebase Storage
			await uploadBytes(storageRef, file);

			// obtener URL de descarga de la imagen subida
			const downloadURL = await getDownloadURL(storageRef);
			const description = form.getFieldValue('description');
			onPhotoUploaded({ description, url: downloadURL });

			// guardar la descripción y la URL en Firestore

			await addDoc(collection(store, 'images'), {
				createdAt: new Date(),
				description,
				downloadURL,
				name: file.name,
			});

			form.resetFields();
			setImageFile(null);
			setUploading(false);

			// informar a Ant Design que la carga fue exitosa
			onSuccess(file as UploadFile<any>);
			message.success('Imagen subida correctamente.');
		} catch (error) {
			console.error('Error al subir la imagen:', error);
			message.error('Error al subir la imagen.');
		}
	};

	const beforeUpload = (file: RcFile) => {
		const isJpgOrPng =
			file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('Solo puedes subir archivos JPG/PNG!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('La imagen debe ser más pequeña que 2MB!');
		}
		setImageFile(file);
		return isJpgOrPng && isLt2M;
	};

	return (
		<Form form={form} layout='vertical'>
			<Form.Item label='Descripción' name='description'>
				<Input.TextArea rows={4} />
			</Form.Item>
			<Form.Item label='Subir Imagen'>
				<Upload
					beforeUpload={beforeUpload}
					customRequest={async (options: any) =>
						await handleCustomRequest(options)
					}
					maxCount={1}
					multiple={false}
					showUploadList={false}
				>
					<Button icon={<UploadOutlined />} loading={uploading}>
						Seleccionar Imagen
					</Button>
				</Upload>
			</Form.Item>
		</Form>
	);
};

export default UploadPhoto;
