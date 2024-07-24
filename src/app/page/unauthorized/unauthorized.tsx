import { Button, Result, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom'; // importa Link si estás usando React Router
import { RollbackOutlined } from '@ant-design/icons'; // importa iconos de Ant Design

const UnauthorizedPage = () => {
	return (
		<div
			style={{
				alignItems: 'center',
				backgroundColor: '#f0f2f5',
				display: 'flex',
				height: '100vh',
				justifyContent: 'center',
			}}
		>
			<Result
				extra={
					<Button
						icon={<RollbackOutlined />}
						size='large'
						style={{ marginTop: 24 }}
						type='primary'
					>
						<Link to='/'>Volver a Inicio</Link>
					</Button>
				}
				status='403'
				subTitle={
					<Typography.Paragraph
						style={{ fontSize: 24, marginTop: 24 }}
					>
						No estás autorizado para acceder a esta página.
					</Typography.Paragraph>
				}
				title={
					<Typography.Title
						level={1}
						style={{
							color: '#fa541c',
							fontSize: 48,
							fontWeight: 'bold',
							marginBottom: 0,
						}}
					>
						¡Ups!
					</Typography.Title>
				}
			/>
		</div>
	);
};

export default UnauthorizedPage;
