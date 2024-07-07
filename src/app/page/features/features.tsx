// src/components/Features.tsx
import React, { useEffect } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { StarOutlined, RocketOutlined, HeartOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setShowShoppingCart } from '../store/slice/store.slice';

const { Title, Paragraph } = Typography;

const featuresData = [
  {
    icon: <StarOutlined style={{ fontSize: '40px', color: '#08c' }} />,
    title: 'Great Features',
    description: 'Discover amazing features that will blow your mind!',
  },
  {
    icon: <RocketOutlined style={{ fontSize: '40px', color: '#08c' }} />,
    title: 'Fast Performance',
    description: 'Experience blazing fast performance with our app.',
  },
  {
    icon: <HeartOutlined style={{ fontSize: '40px', color: '#08c' }} />,
    title: 'Loved by Users',
    description: 'See why our customers love using our app!',
  },
  {
    icon: <SmileOutlined style={{ fontSize: '40px', color: '#08c' }} />,
    title: 'User Friendly',
    description: 'Our app is extremely easy to use and intuitive.',
  },
];

const Features: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setShowShoppingCart(false))
  },[dispatch])
  return (
    <div style={{ padding: '50px 0', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
        Our Features
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {featuresData.map((feature, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card hoverable style={{ textAlign: 'center', padding: '20px' }}>
              {feature.icon}
              <Title level={4} style={{ marginTop: '20px' }}>
                {feature.title}
              </Title>
              <Paragraph>{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Features;
