import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import {
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './create-user.css';
import { storage, store } from 'firebase';
import { Link, useNavigate } from 'react-router-dom';
import { setOpenModalLogin } from 'app/page/login/slice/login.slice';
import { useDispatch } from 'react-redux';
import { registerUser } from 'services/auth.service';

const RegistroUsuario: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			const docRef = await addDoc(collection(store, 'users'), {
				rut: values.rut,
				firstName: values.firstName,
				lastName: values.lastName,
				username: values.username,
				email: values.email,
				phone: values.phone,
				photo: imageUrl,
			});
			message.success('Usuario registrado exitosamente');
			navigate('/inicio');
		} catch (e) {
			console.error('Error adding document: ', e);
			message.error('Error al registrar el usuario');
		}
		try {
			const user = await registerUser(values.email, values.password);
			// Manejar éxito del registro, redireccionar, mostrar mensaje, etc.
			console.log('Usuario registrado:', user);
		  } catch (error) {
			// Manejar errores, como correo ya registrado, contraseña débil, etc.
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
		<Form className='registro-form' onFinish={onFinish} layout='vertical'>
			<Form.Item
				name='rut'
				rules={[
					{ required: true, message: 'Por favor ingrese su RUT!' },
				]}
			>
				<Input placeholder='RUT' />
			</Form.Item>
			<Form.Item
				name='firstName'
				rules={[
					{ required: true, message: 'Por favor ingrese su nombre!' },
				]}
			>
				<Input placeholder='Nombre' />
			</Form.Item>
			<Form.Item
				name='lastName'
				rules={[
					{
						required: true,
						message: 'Por favor ingrese su apellido!',
					},
				]}
			>
				<Input placeholder='Apellido' />
			</Form.Item>
			<Form.Item
				name='username'
				rules={[
					{
						required: true,
						message: 'Por favor ingrese su nombre de usuario!',
					},
				]}
			>
				<Input placeholder='Nombre de Usuario' />
			</Form.Item>
			<Form.Item
				name='email'
				rules={[
					{
						required: true,
						message: 'Por favor ingrese su correo electrónico!',
					},
					{ type: 'email', message: 'Ingrese un correo válido' },
				]}
			>
				<Input
					prefix={<MailOutlined className='site-form-item-icon' />}
					placeholder='Correo Electrónico'
				/>
			</Form.Item>
			<Form.Item
				name='password'
				rules={[
					{
						required: true,
						message: 'Por favor ingrese su contraseña!',
					},
				]}
			>
				<Input.Password
					prefix={<LockOutlined className='site-form-item-icon' />}
					placeholder='Contraseña'
				/>
			</Form.Item>
			<Form.Item
				name='phone'
				rules={[
					{
						required: true,
						message: 'Por favor ingrese su teléfono!',
					},
				]}
			>
				<Input
					prefix={<PhoneOutlined className='site-form-item-icon' />}
					placeholder='Teléfono'
				/>
			</Form.Item>
			<Form.Item
				label='Foto'
				valuePropName='fileList'
				rules={[
					{
						required: true,
						message: 'Por favor sube tu foto de perfil!',
					},
				]}
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
						src={imageUrl}
						alt='avatar'
						style={{ width: '100px', marginTop: '10px' }}
					/>
				)}
			</Form.Item>
			<Form.Item>
				<Button
					type='primary'
					htmlType='submit'
					className='register-form-button'
				>
					Registrarse
				</Button>
			</Form.Item>
			<Form.Item>
				¿Ya tienes una cuenta?{' '}
				<Link to={'/registro-usuario'} onClick={() => modalLogin(true)}>
					Iniciar Sesión
				</Link>
			</Form.Item>
		</Form>
	);
};

export default RegistroUsuario;
