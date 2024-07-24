import {
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Upload, message } from 'antd';
import { setOpenModalLogin } from 'app/page/login/slice/login.slice';
import { storage, store } from 'firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from 'services/auth.service';
import './create-user.css';

const RegistroUsuario: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await setDoc(doc(store, 'users', values.email), {
				email: values.email,
				firstName: values.firstName,
				lastName: values.lastName,
				phone: values.phone,
				photo: imageUrl,
				rut: values.rut,
				username: values.username,
			});
			message.success('Usuario registrado exitosamente');
			navigate('/inicio');
		} catch (error) {
			console.error('Error adding document:', error);
			message.error('Error al registrar el usuario');
		}
		try {
			const user = await registerUser(values.email, values.password);
			// manejar éxito del registro, redireccionar, mostrar mensaje, etc.
			console.log('Usuario registrado:', user);
		} catch (error) {
			// manejar errores, como correo ya registrado, contraseña débil, etc.
			console.error('Error al registrar usuario:', error);
		}
		setLoading(false);
	};

	const handleUpload = async (file: any) => {
		const storageRef = ref(storage, `photos/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {},
			(error) => {
				message.error('Error al subir la foto');
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageUrl(downloadURL);
					message.success('Foto subida exitosamente');
				});
			},
		);
	};

	const modalLogin = (open: boolean) => {
		dispatch(setOpenModalLogin(open));
	};

	return (
		<Form className='registro-form' layout='vertical' onFinish={onFinish}>
			<Form.Item
				name='rut'
				rules={[
					{ message: 'Por favor ingrese su RUT!', required: true },
				]}
			>
				<Input placeholder='RUT' />
			</Form.Item>
			<Form.Item
				name='firstName'
				rules={[
					{ message: 'Por favor ingrese su nombre!', required: true },
				]}
			>
				<Input placeholder='Nombre' />
			</Form.Item>
			<Form.Item
				name='lastName'
				rules={[
					{
						message: 'Por favor ingrese su apellido!',
						required: true,
					},
				]}
			>
				<Input placeholder='Apellido' />
			</Form.Item>
			<Form.Item
				name='username'
				rules={[
					{
						message: 'Por favor ingrese su nombre de usuario!',
						required: true,
					},
				]}
			>
				<Input placeholder='Nombre de Usuario' />
			</Form.Item>
			<Form.Item
				name='email'
				rules={[
					{
						message: 'Por favor ingrese su correo electrónico!',
						required: true,
					},
					{ message: 'Ingrese un correo válido', type: 'email' },
				]}
			>
				<Input
					placeholder='Correo Electrónico'
					prefix={<MailOutlined className='site-form-item-icon' />}
				/>
			</Form.Item>
			<Form.Item
				name='password'
				rules={[
					{
						message: 'Por favor ingrese su contraseña!',
						required: true,
					},
				]}
			>
				<Input.Password
					placeholder='Contraseña'
					prefix={<LockOutlined className='site-form-item-icon' />}
				/>
			</Form.Item>
			<Form.Item
				name='phone'
				rules={[
					{
						message: 'Por favor ingrese su teléfono!',
						required: true,
					},
				]}
			>
				<Input
					placeholder='Teléfono'
					prefix={<PhoneOutlined className='site-form-item-icon' />}
				/>
			</Form.Item>
			<Form.Item
				label='Foto'
				rules={[
					{
						message: 'Por favor sube tu foto de perfil!',
						required: true,
					},
				]}
				valuePropName='fileList'
			>
				<Upload
					beforeUpload={(file) => {
						handleUpload(file);
						return false;
					}}
					showUploadList={false}
				>
					<Button icon={<UploadOutlined />}>Subir Foto</Button>
				</Upload>
				{imageUrl && (
					<img
						alt='avatar'
						src={imageUrl}
						style={{ marginTop: '10px', width: '100px' }}
					/>
				)}
			</Form.Item>
			<Form.Item>
				<Button
					className='register-form-button'
					htmlType='submit'
					type='primary'
				>
					Registrarse
				</Button>
			</Form.Item>
			<Form.Item>
				¿Ya tienes una cuenta?{' '}
				<Link onClick={() => modalLogin(true)} to={'/registro-usuario'}>
					Iniciar Sesión
				</Link>
			</Form.Item>
		</Form>
	);
};

export default RegistroUsuario;
