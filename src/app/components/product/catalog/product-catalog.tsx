// src/components/ProductCatalog.tsx
import { Col, Row, notification } from 'antd';
import React, { useState } from 'react';
import ProductCard from '../card/product-card';

interface Product {
	id: number;
	description: string;
	imageUrl: string;
	name: string;
	price: number;
}

const ProductCatalog: React.FC = () => {
	const [products] = useState([
		{
			id: 1,
			description: 'This is a great product.',
			imageUrl: 'https://via.placeholder.com/300',
			name: 'Product 1',
			price: 29.99,
		},
		{
			id: 2,
			description: 'This is another great product.',
			imageUrl: 'https://via.placeholder.com/300',
			name: 'Product 2',
			price: 39.99,
		},
		// añade más productos aquí
	]);
	const handleAddToCart = (product: Product) => {
		notification.success({
			description: `${product.name} has been added to your cart.`,
			message: 'Product Added',
		});
	};
	return (
		<Row gutter={[16, 16]}>
			{products.map((product) => (
				<Col key={product.id} lg={6} md={8} sm={12} xs={24}>
					<ProductCard
						onAddToCart={() => handleAddToCart(product)}
						product={product}
					/>
				</Col>
			))}
		</Row>
	);
};

export default ProductCatalog;
