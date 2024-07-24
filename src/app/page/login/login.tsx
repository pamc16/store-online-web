// src/components/Login.tsx
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import LoadingComponent from 'app/components/loading/loading';
import useTexts from 'hooks/use-text';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByEmail, loginUser } from 'services/auth.service';
import {
	setAccessToken,
	setOpenModalLogin,
	setUser,
} from './slice/login.slice';
import './login.css';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onFinish = async (values: any) => {
		try {
			const user: any = await loginUser(values.email, values.password);
			// manejar éxito del inicio de sesión, redireccionar, mostrar mensaje, etc.
			console.log('Inicio de sesión exitoso:', user);

			dispatch(setOpenModalLogin(false));
			dispatch(setAccessToken(user.accessToken));
			const users = await getUserByEmail(values.email);
			dispatch(setUser(users));
			navigate('/inicio');
		} catch (error) {
			// manejar errores, como credenciales incorrectas, cuenta no existente, etc.
			console.error('Error al iniciar sesión:', error);
			navigate('/registro-usuario');
			dispatch(setOpenModalLogin(false));
		}
	};

	const closeModalLogin = () => {
		dispatch(setOpenModalLogin(false));
	};

	const { loading, texts } = useTexts('login');

	if (loading) {
		return <LoadingComponent />;
	}

	const { body, error, link, placeholder } = texts;

	return (
		<div className='gmail-style-form'>
			<h2>{body.title}</h2>
			<Form
				className='login-form'
				initialValues={{ remember: true }}
				name='normal_login'
				onFinish={onFinish}
			>
				<Form.Item
					name='email'
					rules={[
						{
							message: error.email,
							required: true,
						},
					]}
				>
					<Input
						placeholder={placeholder.email}
						prefix={
							<UserOutlined className='site-form-item-icon' />
						}
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{
							message: error.password,
							required: true,
						},
					]}
				>
					<Input
						placeholder={placeholder.password}
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
						type='password'
					/>
				</Form.Item>
				<Form.Item>
					<Link
						className='login-form-forgot'
						onClick={() => closeModalLogin()}
						to='/registro-usuario/password-recovery'
					>
						{link.list[0].text}
					</Link>
				</Form.Item>
				<Form.Item>
					<Button
						className='login-form-button'
						htmlType='submit'
						type='primary'
					>
						{body.title}
					</Button>
				</Form.Item>
				<Form.Item>
					{body.not_account}{' '}
					<Link
						onClick={() => closeModalLogin()}
						to={'/registro-usuario'}
					>
						{link.list[1].text}
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
