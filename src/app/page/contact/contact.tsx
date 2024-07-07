// src/components/Contact.tsx
import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Input, Button } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setShowShoppingCart } from '../store/slice/store.slice';

const { Title, Paragraph } = Typography;

const contactInfo = [
  {
    icon: <MailOutlined style={{ fontSize: '24px', color: '#08c' }} />,
    title: 'Email',
    description: 'contact@example.com',
  },
  {
    icon: <PhoneOutlined style={{ fontSize: '24px', color: '#08c' }} />,
    title: 'Phone',
    description: '+1 234 567 890',
  },
  {
    icon: <HomeOutlined style={{ fontSize: '24px', color: '#08c' }} />,
    title: 'Location',
    description: '123 Main Street, City, Country',
  },
];

const socialMedia = [
  {
    icon: <FacebookOutlined style={{ fontSize: '24px', color: '#08c' }} />,
    link: 'https://www.facebook.com',
  },
  {
    icon: <TwitterOutlined style={{ fontSize: '24px', color: '#08c' }} />,
    link: 'https://www.twitter.com',
  },
  {
    icon: <LinkedinOutlined style={{ fontSize: '24px', color: '#08c' }} />,
    link: 'https://www.linkedin.com',
  },
];

const Contact: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setShowShoppingCart(false))
  },[dispatch])

  const handleFinish = (values: any) => {
    console.log('Received values:', values);
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviar un correo
  };

  return (
    <div style={{ padding: '50px 0', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
        Contact Us
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {contactInfo.map((info, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card hoverable style={{ textAlign: 'center', padding: '20px' }}>
              {info.icon}
              <Title level={4} style={{ marginTop: '20px' }}>{info.title}</Title>
              <Paragraph>{info.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: '40px' }}>
        {socialMedia.map((social, index) => (
          <Col xs={8} sm={8} md={4} key={index} style={{ textAlign: 'center' }}>
            <a href={social.link} target="_blank" rel="noopener noreferrer">
              {social.icon}
            </a>
          </Col>
        ))}
      </Row>
      <Row justify="center" style={{ marginTop: '40px' }}>
        <Col xs={24} sm={18} md={12}>
          <Card hoverable style={{ padding: '20px' }}>
            <Title level={4} style={{ textAlign: 'center' }}>Send Us a Message</Title>
            <Form
              form={form}
              name="contact"
              layout="vertical"
              onFinish={handleFinish}
              style={{ marginTop: '20px' }}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <Input.TextArea rows={4} placeholder="Your Message" />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
