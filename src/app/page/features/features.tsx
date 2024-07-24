// src/components/Features.tsx
import {
	HeartOutlined,
	RocketOutlined,
	SmileOutlined,
	StarOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setShowShoppingCart } from '../store/slice/store.slice';

const { Paragraph, Title } = Typography;

const featuresData = [
	{
		description: 'Discover amazing features that will blow your mind!',
		icon: <StarOutlined style={{ color: '#08c', fontSize: '40px' }} />,
		title: 'Great Features',
	},
	{
		description: 'Experience blazing fast performance with our app.',
		icon: <RocketOutlined style={{ color: '#08c', fontSize: '40px' }} />,
		title: 'Fast Performance',
	},
	{
		description: 'See why our customers love using our app!',
		icon: <HeartOutlined style={{ color: '#08c', fontSize: '40px' }} />,
		title: 'Loved by Users',
	},
	{
		description: 'Our app is extremely easy to use and intuitive.',
		icon: <SmileOutlined style={{ color: '#08c', fontSize: '40px' }} />,
		title: 'User Friendly',
	},
];

const Features: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setShowShoppingCart(false));
	}, [dispatch]);
	return (
		<div style={{ backgroundColor: '#f0f2f5', padding: '50px 0' }}>
			<Title
				level={2}
				style={{ marginBottom: '40px', textAlign: 'center' }}
			>
				Our Features
			</Title>
			<Row gutter={[16, 16]} justify='center'>
				{featuresData.map((feature, index) => (
					<Col key={index} lg={6} md={8} sm={12} xs={24}>
						<Card
							hoverable
							style={{ padding: '20px', textAlign: 'center' }}
						>
							{feature.icon}
							<Title level={4} style={{ marginTop: '20px' }}>
								{feature.title}
							</Title>
							<Paragraph>{feature.description}</Paragraph>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Features;
