import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import ReCAPTCHA from "react-google-recaptcha";
import './password-recovery.css'; // Estilos personalizados

const { Text } = Typography;

const PasswordRecoveryForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Aquí puedes agregar la lógica para validar el Recaptcha y enviar la solicitud de recuperación de contraseña
  };

  const handleRecaptchaChange = (value: string | null) => {
    console.log("Recaptcha value:", value);
    // Puedes realizar la validación del Recaptcha aquí o enviar el valor al backend para validar
  };

  return (
    <div className="password-recovery-form">
      <h2>Recuperar Contraseña</h2>
      <Form
        name="normal_recovery"
        className="recovery-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item>
          <Text>
            Ingresa tu correo electrónico registrado. Te enviaremos instrucciones para recuperar tu contraseña.
          </Text>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Por favor ingrese su correo electrónico!' }, { type: 'email', message: 'Ingrese un correo válido' }]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Correo Electrónico" />
        </Form.Item>
        <Form.Item>
          {/* <ReCAPTCHA
            sitekey="6LebuBIqAAAAAD4-QHC-4kS-b83MDgOpsPD_qDg7"
            onChange={handleRecaptchaChange}
          /> */}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="recovery-form-button">
            Enviar Solicitud
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordRecoveryForm;
