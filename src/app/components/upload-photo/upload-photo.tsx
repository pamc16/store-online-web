import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, store } from 'firebase';
import './upload-photo.css';
import { Button, Form, Input, message, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/es/upload';
import { addDoc, collection } from 'firebase/firestore';

interface UploadPhotoProps {
	onPhotoUploaded: (photo: {url: string; description:string }) => void;
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
			// Subir imagen a Firebase Storage
			await uploadBytes(storageRef, file);

			// Obtener URL de descarga de la imagen subida
			const downloadURL = await getDownloadURL(storageRef);
      const description = form.getFieldValue('description');
			onPhotoUploaded({url: downloadURL, description });

      // Guardar la descripción y la URL en Firestore
       
      await addDoc(collection(store, 'images'),{
        downloadURL,
        description,
        createdAt: new Date(),
        name: file.name,
      });

      form.resetFields();
      setImageFile(null);
      setUploading(false);

			// Informar a Ant Design que la carga fue exitosa
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
    <Form form={form} layout="vertical">
      <Form.Item label="Descripción" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Subir Imagen">
        <Upload customRequest={async (options: any) => await handleCustomRequest(options)} beforeUpload={beforeUpload} maxCount={1} multiple={false} showUploadList={false}>
          <Button icon={<UploadOutlined />} loading={uploading}>
            Seleccionar Imagen
          </Button>
        </Upload>
      </Form.Item>
    </Form>
	);
};

export default UploadPhoto;
