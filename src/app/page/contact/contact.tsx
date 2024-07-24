// src/components/Contact.tsx
import {
	FacebookOutlined,
	HomeOutlined,
	LinkedinOutlined,
	MailOutlined,
	PhoneOutlined,
	TwitterOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setShowShoppingCart } from '../store/slice/store.slice';

const { Paragraph, Title } = Typography;

const contactInfo = [
	{
		description: 'contact@example.com',
		icon: <MailOutlined style={{ color: '#08c', fontSize: '24px' }} />,
		title: 'Email',
	},
	{
		description: '+1 234 567 890',
		icon: <PhoneOutlined style={{ color: '#08c', fontSize: '24px' }} />,
		title: 'Phone',
	},
	{
		description: '123 Main Street, City, Country',
		icon: <HomeOutlined style={{ color: '#08c', fontSize: '24px' }} />,
		title: 'Location',
	},
];

const socialMedia = [
	{
		icon: <FacebookOutlined style={{ color: '#08c', fontSize: '24px' }} />,
		link: 'https://www.facebook.com',
	},
	{
		icon: <TwitterOutlined style={{ color: '#08c', fontSize: '24px' }} />,
		link: 'https://www.twitter.com',
	},
	{
		icon: <LinkedinOutlined style={{ color: '#08c', fontSize: '24px' }} />,
		link: 'https://www.linkedin.com',
	},
];

const Contact: React.FC = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setShowShoppingCart(false));
	}, [dispatch]);

	const handleFinish = (values: any) => {
		console.log('Received values:', values);
		// aquí puedes manejar el envío del formulario, por ejemplo, enviar un correo
	};

	return (
		<div style={{ backgroundColor: '#f0f2f5', padding: '50px 0' }}>
			<Title
				level={2}
				style={{ marginBottom: '40px', textAlign: 'center' }}
			>
				Contact Us
			</Title>
			<Row gutter={[16, 16]} justify='center'>
				{contactInfo.map((info, index) => (
					<Col key={index} md={8} sm={12} xs={24}>
						<Card
							hoverable
							style={{ padding: '20px', textAlign: 'center' }}
						>
							{info.icon}
							<Title level={4} style={{ marginTop: '20px' }}>
								{info.title}
							</Title>
							<Paragraph>{info.description}</Paragraph>
						</Card>
					</Col>
				))}
			</Row>
			<Row
				gutter={[16, 16]}
				justify='center'
				style={{ marginTop: '40px' }}
			>
				{socialMedia.map((social, index) => (
					<Col
						key={index}
						md={4}
						sm={8}
						style={{ textAlign: 'center' }}
						xs={8}
					>
						<a
							href={social.link}
							rel='noopener noreferrer'
							target='_blank'
						>
							{social.icon}
						</a>
					</Col>
				))}
			</Row>
			<Row justify='center' style={{ marginTop: '40px' }}>
				<Col md={12} sm={18} xs={24}>
					<Card hoverable style={{ padding: '20px' }}>
						<Title level={4} style={{ textAlign: 'center' }}>
							Send Us a Message
						</Title>
						<Form
							form={form}
							layout='vertical'
							name='contact'
							onFinish={handleFinish}
							style={{ marginTop: '20px' }}
						>
							<Form.Item
								label='Name'
								name='name'
								rules={[
									{
										message: 'Please enter your name',
										required: true,
									},
								]}
							>
								<Input placeholder='Your Name' />
							</Form.Item>
							<Form.Item
								label='Email'
								name='email'
								rules={[
									{
										message: 'Please enter your email',
										required: true,
										type: 'email',
									},
								]}
							>
								<Input placeholder='Your Email' />
							</Form.Item>
							<Form.Item
								label='Message'
								name='message'
								rules={[
									{
										message: 'Please enter your message',
										required: true,
									},
								]}
							>
								<Input.TextArea
									placeholder='Your Message'
									rows={4}
								/>
							</Form.Item>
							<Form.Item style={{ textAlign: 'center' }}>
								<Button htmlType='submit' type='primary'>
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
