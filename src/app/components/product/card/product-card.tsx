// src/components/ProductCard.tsx
import React from 'react';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.imageUrl} />}
      actions={[
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>,
      ]}
    >
      <Card.Meta
        title={product.name}
        description={
          <>
            <p>{product.description}</p>
            <p><strong>${product.price.toFixed(2)}</strong></p>
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;
