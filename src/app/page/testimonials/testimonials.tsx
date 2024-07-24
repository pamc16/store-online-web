// src/components/Testimonials.tsx
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import React from 'react';
import './testimonials.css';

const { Paragraph, Title } = Typography;

const testimonialsData = [
	{
		avatar: 'https://via.placeholder.com/150',
		name: 'John Doe',
		testimonial:
			'This app is amazing! It has changed my life for the better.',
	},
	{
		avatar: 'https://via.placeholder.com/150',
		name: 'Jane Smith',
		testimonial:
			"Highly recommend this app to everyone. It's so easy to use!",
	},
	{
		avatar: 'https://via.placeholder.com/150',
		name: 'Michael Brown',
		testimonial:
			'The customer service is outstanding. I had an issue and it was resolved in no time.',
	},
	{
		avatar: 'https://via.placeholder.com/150',
		name: 'Emily White',
		testimonial:
			"Love the features and the design. It's perfect for my needs.",
	},
];

const Testimonials: React.FC = () => {
	return (
		<div style={{ backgroundColor: '#f0f2f5', padding: '50px 0' }}>
			<Title
				level={2}
				style={{ marginBottom: '40px', textAlign: 'center' }}
			>
				What Our Customers Say
			</Title>
			<Row gutter={[16, 16]} justify='center'>
				{testimonialsData.map((testimonial, index) => (
					<Col key={index} lg={6} md={8} sm={12} xs={24}>
						<Card
							hoverable
							style={{ padding: '20px', textAlign: 'center' }}
						>
							<Avatar
								icon={<UserOutlined />}
								size={80}
								src={testimonial.avatar}
								style={{ marginBottom: '20px' }}
							/>
							<Title level={4}>{testimonial.name}</Title>
							<Paragraph>{testimonial.testimonial}</Paragraph>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Testimonials;
