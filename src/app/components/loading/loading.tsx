import { Spin } from 'antd';
import React from 'react';
import { BarLoader, BeatLoader, RingLoader } from 'react-spinners';
import './loading.css'; // archivo CSS para estilos personalizados

const LoadingComponent = () => {
	return (
		<div className='loading-container'>
			<Spin size='large' />
			<div className='custom-loader'>
				<BarLoader
					color='#1890ff'
					height={4}
					loading={true}
					width={150}
				/>
			</div>
			<div className='custom-loader'>
				<BeatLoader color='#52c41a' loading={true} size={24} />
			</div>
			<div className='custom-loader'>
				<RingLoader color='#f5222d' loading={true} size={60} />
			</div>
		</div>
	);
};

export default LoadingComponent;
