// src/components/Login.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { setAccessToken, setOpenModalLogin } from './slice/login.slice';
import { useDispatch } from 'react-redux';
import { loginUser } from 'services/auth.service';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onFinish = async (values: any) => {

    try {
      const user: any = await loginUser(values.email, values.password);
      // Manejar éxito del inicio de sesión, redireccionar, mostrar mensaje, etc.
      console.log('Inicio de sesión exitoso:', user);
	  navigate('/inicio')
	  dispatch(setOpenModalLogin(false));
	  dispatch(setAccessToken(user.accessToken));
    } catch (error) {
      // Manejar errores, como credenciales incorrectas, cuenta no existente, etc.
      console.error('Error al iniciar sesión:', error);
	  navigate('/registro-usuario')
	  dispatch(setOpenModalLogin(false));
    }
	};

	const closeModalLogin = () => {
		dispatch(setOpenModalLogin(false));
	};

	return (
		<div className='gmail-style-form'>
			<h2>Iniciar Sesión</h2>
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
							message: 'Por favor ingrese su correo electrónico!',
						},
					]}
				>
					<Input
						prefix={
							<UserOutlined className='site-form-item-icon' />
						}
						placeholder='Correo electrónico'
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
					<Input
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
						type='password'
						placeholder='Contraseña'
					/>
				</Form.Item>
				<Form.Item>
					<Link
						className='login-form-forgot'
						to='/registro-usuario/password-recovery'
						onClick={() => closeModalLogin()}
					>
						¿Olvidaste tu contraseña?
					</Link>
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
					>
						Iniciar Sesión
					</Button>
				</Form.Item>
				<Form.Item>
					¿No tienes una cuenta?{' '}
					<Link
						to={'/registro-usuario'}
						onClick={() => closeModalLogin()}
					>
						Register now!
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
