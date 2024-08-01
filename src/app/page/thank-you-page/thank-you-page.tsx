import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './thank-you-page.css';

const ThankYouPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className='thank-you-page'>
			<h1>Thank You for Your Subscription!</h1>
			<p>Your subscription has been successfully processed.</p>
			<Button onClick={() => navigate('/premium')} type='primary'>
				Go Back to Home
			</Button>
		</div>
	);
};

export default ThankYouPage;
