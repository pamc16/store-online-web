// src/components/Login.tsx
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import LoadingComponent from 'app/components/loading/loading';
import useTexts from 'hooks/use-text';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByEmail, loginUser } from 'services/auth.service';
import {
	setAccessToken,
	setLoading,
	setOpenModalLogin,
	setUser,
	useLoginSelector,
} from './slice/login.slice';
import './login.css';
import { setSelectedTab } from 'app/layout/slices/layout.slice';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { loadingAuth } = useLoginSelector();

	const onFinish = async (values: any) => {
		try {
			dispatch(setLoading(true));
			const user: any = await loginUser(values.email, values.password);
			// manejar éxito del inicio de sesión, redireccionar, mostrar mensaje, etc.
			console.log('Inicio de sesión exitoso:', user);

			dispatch(setOpenModalLogin(false));
			dispatch(setAccessToken(user.accessToken));
			const users = await getUserByEmail(values.email);
			dispatch(setUser(users));
			dispatch(setSelectedTab('premium'));
			localStorage.setItem('accessToken', user.accessToken);
			notification.success({
				description: `Sesión iniciada con éxito`,
				message: 'Éxito',
			});
			navigate('/premium');
		} catch (error) {
			// manejar errores, como credenciales incorrectas, cuenta no existente, etc.
			notification.error({
				description: 'Usuario no existe',
				message: 'Error al iniciar sesión',
			});
			dispatch(setOpenModalLogin(false));
			navigate('/registro-usuario');
		} finally {
			dispatch(setLoading(false));
		}
	};

	const closeModalLogin = () => {
		dispatch(setOpenModalLogin(false));
	};

	const { loading, texts } = useTexts('login');

	if (loading || loadingAuth) {
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
						to={link.list[0].to}
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
						to={link.list[1].to}
					>
						{link.list[1].text}
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
