import { Card, Col, Row } from 'antd';
import React from 'react';
import './categoria.css';

const CategoriaPage = () => {
	const categories = [
		{
			id: 1,
			image: 'https://th.bing.com/th/id/OIP.rh781NRHTWQA63utuWnsEQHaE8?pid=ImgDet&rs=1',
			title: 'Deportes',
		},
		{
			id: 2,
			image: 'https://th.bing.com/th/id/R.e01aac6cc0faaffe3d74eeebb1535fe4?rik=UjqedmXrpHWmLQ&pid=ImgRaw&r=0',
			title: 'Menaje',
		},
		{
			id: 3,
			image: 'https://th.bing.com/th/id/R.e7e1e07901b31e9baabd9b46e5a25419?rik=7XLxdsJ5D4URjg&pid=ImgRaw&r=0',
			title: 'Electro Hogar',
		},
		// agrega más categorías según sea necesario
	];

	return (
		<div className='categoria-container current'>
			<h1>Categorías</h1>
			<Row className='categoria-row' gutter={[16, 16]}>
				{categories.map((category) => (
					<Col key={category.id} lg={6} md={8} sm={12} xs={24}>
						<Card
							cover={
								<img
									alt={category.title}
									src={category.image}
								/>
							}
							hoverable
						>
							<Card.Meta title={category.title} />
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default CategoriaPage;
