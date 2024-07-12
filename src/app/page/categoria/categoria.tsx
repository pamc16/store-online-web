import React from "react";
import { Row, Col, Card } from "antd";
import "./categoria.css";

const CategoriaPage = () => {
  const categories = [
    {
      id: 1,
      title: "Deportes",
      image:
        "https://th.bing.com/th/id/OIP.rh781NRHTWQA63utuWnsEQHaE8?pid=ImgDet&rs=1",
    },
    {
      id: 2,
      title: "Menaje",
      image:
        "https://th.bing.com/th/id/R.e01aac6cc0faaffe3d74eeebb1535fe4?rik=UjqedmXrpHWmLQ&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      title: "Electro Hogar",
      image:
        "https://th.bing.com/th/id/R.e7e1e07901b31e9baabd9b46e5a25419?rik=7XLxdsJ5D4URjg&pid=ImgRaw&r=0",
    },
    // Agrega más categorías según sea necesario
  ];

  return (
    <div className="categoria-container current">
      <h1>Categorías</h1>
      <Row gutter={[16, 16]} className="categoria-row">
        {categories.map((category) => (
          <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={<img src={category.image} alt={category.title} />}
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
