// src/components/Testimonials.tsx
import React from 'react';
import { Row, Col, Card, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './testimonials.css'

const { Title, Paragraph } = Typography;

const testimonialsData = [
  {
    name: 'John Doe',
    testimonial: 'This app is amazing! It has changed my life for the better.',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    testimonial: 'Highly recommend this app to everyone. It\'s so easy to use!',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    name: 'Michael Brown',
    testimonial: 'The customer service is outstanding. I had an issue and it was resolved in no time.',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    name: 'Emily White',
    testimonial: 'Love the features and the design. It\'s perfect for my needs.',
    avatar: 'https://via.placeholder.com/150',
  },
];

const Testimonials: React.FC = () => {
  return (
    <div style={{ padding: '50px 0', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
        What Our Customers Say
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {testimonialsData.map((testimonial, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card hoverable style={{ textAlign: 'center', padding: '20px' }}>
              <Avatar
                size={80}
                src={testimonial.avatar}
                icon={<UserOutlined />}
                style={{ marginBottom: '20px' }}
              />
              <Title level={4}>{testimonial.name}</Title>
              <Paragraph>{testimonial.testimonial}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonials;
