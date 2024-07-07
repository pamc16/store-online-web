// src/components/ProductCatalog.tsx
import React, { useState } from "react";
import { Row, Col, notification } from "antd";
import ProductCard from "../card/product-card";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCatalog: React.FC = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "This is a great product.",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is another great product.",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300",
    },
    // Añade más productos aquí
  ]);
  const handleAddToCart = (product: Product) => {
    notification.success({
      message: "Product Added",
      description: `${product.name} has been added to your cart.`,
    });
  };
  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <ProductCard
            product={product}
            onAddToCart={() => handleAddToCart(product)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductCatalog;
