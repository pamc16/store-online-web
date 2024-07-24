// src/components/ProductCard.tsx
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React from 'react';

interface Product {
	id: number;
	description: string;
	imageUrl: string;
	name: string;
	price: number;
}

interface ProductCardProps {
	onAddToCart: (product: Product) => void;
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ onAddToCart, product }) => {
	return (
		<Card
			actions={[
				<Button
					icon={<ShoppingCartOutlined />}
					onClick={() => onAddToCart(product)}
					type='primary'
				>
					Add to Cart
				</Button>,
			]}
			cover={<img alt={product.name} src={product.imageUrl} />}
			hoverable
		>
			<Card.Meta
				description={
					<>
						<p>{product.description}</p>
						<p>
							<strong>${product.price.toFixed(2)}</strong>
						</p>
					</>
				}
				title={product.name}
			/>
		</Card>
	);
};

export default ProductCard;
