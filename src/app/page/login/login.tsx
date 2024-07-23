// src/components/Login.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { setAccessToken, setOpenModalLogin, setUser } from './slice/login.slice';
import { useDispatch } from 'react-redux';
import { getUserByEmail, loginUser } from 'services/auth.service';
import useTexts from 'hooks/use-text';
import LoadingComponent from 'app/components/loading/loading';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onFinish = async (values: any) => {
		try {
			const user: any = await loginUser(values.email, values.password);
			// Manejar éxito del inicio de sesión, redireccionar, mostrar mensaje, etc.
			console.log('Inicio de sesión exitoso:', user);
			
			dispatch(setOpenModalLogin(false));
			dispatch(setAccessToken(user.accessToken));
			const users = await getUserByEmail(values.email);
			dispatch(setUser(users))
			navigate('/inicio');
		} catch (error) {
			// Manejar errores, como credenciales incorrectas, cuenta no existente, etc.
			console.error('Error al iniciar sesión:', error);
			navigate('/registro-usuario');
			dispatch(setOpenModalLogin(false));
		}
	};

	const closeModalLogin = () => {
		dispatch(setOpenModalLogin(false));
	};

	const { texts, loading } = useTexts('login');

	if (loading) {
		return <LoadingComponent />;
	}

	const { body, error, placeholder, link } = texts;

	return (
		<div className='gmail-style-form'>
			<h2>{body.title}</h2>
			<Form
				name='normal_login'
				className='login-form'
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name='email'
					rules={[
						{
							required: true,
							message: error.email,
						},
					]}
				>
					<Input
						prefix={
							<UserOutlined className='site-form-item-icon' />
						}
						placeholder={placeholder.email}
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: error.password,
						},
					]}
				>
					<Input
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
						type='password'
						placeholder={placeholder.password}
					/>
				</Form.Item>
				<Form.Item>
					<Link
						className='login-form-forgot'
						to='/registro-usuario/password-recovery'
						onClick={() => closeModalLogin()}
					>
						{link.list[0].text}
					</Link>
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
					>
						{body.title}
					</Button>
				</Form.Item>
				<Form.Item>
					{body.not_account}{' '}
					<Link
						to={'/registro-usuario'}
						onClick={() => closeModalLogin()}
					>
						{link.list[1].text}
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
