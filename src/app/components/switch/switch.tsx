import { RocketOutlined, StarOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import {
	setSelectedTab,
	useLayoutSelector,
} from 'app/layout/slices/layout.slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './switch.css';

const StyledSwitch: React.FC = () => {
	const { selectedTab } = useLayoutSelector();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (checked: boolean) => {
		dispatch(setSelectedTab(checked ? 'premium' : 'landing_page'));
		navigate(`/${checked ? 'premium' : 'inicio'}`);
	};

	const checked = selectedTab === 'premium';

	return (
		<div className={`switch-container ${checked ? 'premium' : 'landing'}`}>
			<div className='switch-label landing-label'>
				<RocketOutlined />
				<span>Landing</span>
			</div>
			<Switch
				checked={checked}
				className='custom-switch'
				onChange={handleChange}
			/>
			<div className='switch-label premium-label'>
				<StarOutlined />
				<span>Premium</span>
			</div>
		</div>
	);
};

export default StyledSwitch;
