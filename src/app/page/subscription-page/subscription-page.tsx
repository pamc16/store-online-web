import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Modal,
	Row,
	Select,
	message,
} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './subscription-page.css';

const { Meta } = Card;
const { Option } = Select;

const plans = [
	{
		description: 'Ideal for individuals who are just getting started.',
		features: ['1 Project', 'Basic Support', '5 GB Storage'],
		price: '$0',
		title: 'Free Plan',
	},
	{
		description: 'Perfect for professionals who need more features.',
		features: ['10 Projects', 'Priority Support', '50 GB Storage'],
		price: '$29',
		title: 'Pro Plan',
	},
	{
		description: 'Best for large teams and enterprises.',
		features: ['Unlimited Projects', '24/7 Support', 'Unlimited Storage'],
		price: '$99',
		title: 'Enterprise Plan',
	},
];

const SubscriptionPage: React.FC = () => {
	const [selectedPlan, setSelectedPlan] = useState({
		description: '',
		features: [],
		price: '',
		title: '',
	});
	const [isModalVisible, setIsModalVisible] = useState(false);
	const navigate = useNavigate();

	const showPaymentModal = (plan: any) => {
		setSelectedPlan(plan);
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handlePayment = (values: any) => {
		void message.success('Subscription successful!');
		setIsModalVisible(false);
		navigate('/thank-you');
	};

	return (
		<div className='subscription-page'>
			<h1>Choose Your Subscription Plan</h1>
			<Row gutter={[16, 16]} justify='center'>
				{plans.map((plan, index) => (
					<Col key={index} md={8} sm={12} xs={24}>
						<Card
							actions={[
								<Button
									key={index}
									onClick={() => showPaymentModal(plan)}
									type='primary'
								>
									Select Plan
								</Button>,
							]}
							bordered={false}
							className='plan-card'
							hoverable
							key={index}
							title={plan.title}
						>
							<Meta
								description={plan.description}
								title={plan.price}
							/>
							<ul className='features-list'>
								{plan.features.map((feature, i) => (
									<li key={i}>{feature}</li>
								))}
							</ul>
						</Card>
					</Col>
				))}
			</Row>
			<Modal
				className='payment-modal'
				footer={null}
				onCancel={handleCancel}
				open={isModalVisible}
				title='Payment Information'
			>
				<Form onFinish={handlePayment}>
					<Form.Item label='Selected Plan'>
						<Input readOnly value={selectedPlan?.title} />
					</Form.Item>
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
						<Input />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								message: 'Please enter your email',
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Payment Method'
						name='paymentMethod'
						rules={[
							{
								message: 'Please select a payment method',
								required: true,
							},
						]}
					>
						<Select>
							<Option value='creditCard'>Credit Card</Option>
							<Option value='paypal'>PayPal</Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button block htmlType='submit' type='primary'>
							Proceed to Payment
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default SubscriptionPage;
