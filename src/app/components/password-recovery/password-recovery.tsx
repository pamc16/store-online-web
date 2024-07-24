import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './password-recovery.css'; // estilos personalizados

const { Text } = Typography;

const PasswordRecoveryForm: React.FC = () => {
	const onFinish = (values: any) => {
		console.log('Received values:', values);
		// aquí puedes agregar la lógica para validar el Recaptcha y enviar la solicitud de recuperación de contraseña
	};

	const handleRecaptchaChange = (value: string | null) => {
		console.log('Recaptcha value:', value);
		// puedes realizar la validación del Recaptcha aquí o enviar el valor al backend para validar
	};

	return (
		<div className='password-recovery-form'>
			<h2>Recuperar Contraseña</h2>
			<Form
				className='recovery-form'
				initialValues={{ remember: true }}
				name='normal_recovery'
				onFinish={onFinish}
			>
				<Form.Item>
					<Text>
						Ingresa tu correo electrónico registrado. Te enviaremos
						instrucciones para recuperar tu contraseña.
					</Text>
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
						prefix={
							<MailOutlined className='site-form-item-icon' />
						}
					/>
				</Form.Item>
				<Form.Item>
					{/* <ReCAPTCHA
            sitekey="6LebuBIqAAAAAD4-QHC-4kS-b83MDgOpsPD_qDg7"
            onChange={handleRecaptchaChange}
          /> */}
				</Form.Item>
				<Form.Item>
					<Button
						className='recovery-form-button'
						htmlType='submit'
						type='primary'
					>
						Enviar Solicitud
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default PasswordRecoveryForm;
