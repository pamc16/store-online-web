import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import './subscription-plans.css';

const { Meta } = Card;

const plans = [
	{
		buttonText: 'Get Started',
		buttonType: 'default',
		description: 'Ideal for individuals who are just getting started.',
		features: ['1 Project', 'Basic Support', '5 GB Storage'],
		price: '$0',
		title: 'Free Plan',
	},
	{
		buttonText: 'Subscribe Now',
		buttonType: 'primary',
		description: 'Perfect for professionals who need more features.',
		features: ['10 Projects', 'Priority Support', '50 GB Storage'],
		price: '$29',
		title: 'Pro Plan',
	},
	{
		buttonText: 'Contact Us',
		buttonType: 'primary',
		description: 'Best for large teams and enterprises.',
		features: ['Unlimited Projects', '24/7 Support', 'Unlimited Storage'],
		price: '$99',
		title: 'Enterprise Plan',
	},
];

const SubscriptionPlans: React.FC = () => {
	return (
		<div className='subscription-plans'>
			<Row gutter={[16, 16]} justify='center'>
				{plans.map((plan, index) => (
					<Col key={index} md={8} sm={12} xs={24}>
						<Card
							actions={[
								<Button
									block
									className='button-sub-plan'
									key={index}
									type={plan.buttonType as any}
								>
									{plan.buttonText}
								</Button>,
							]}
							bordered={false}
							className={`plan-card ${plan.buttonType === 'primary' ? 'pro-card' : ''}`}
							hoverable
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
		</div>
	);
};

export default SubscriptionPlans;
