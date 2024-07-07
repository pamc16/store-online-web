// src/components/LandingPage.tsx
import React from 'react';
import { Layout, Menu, Carousel, Typography, Row, Col, Card, Button, Divider } from 'antd';
import { StarOutlined, DesktopOutlined, HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage: React.FC = () => {
  return (
    
        <div className="site-layout-content">
          <Carousel autoplay>
            <div>
              <img src="https://via.placeholder.com/1200x400" alt="slide" style={{ width: '100%' }} />
            </div>
            <div>
              <img src="https://via.placeholder.com/1200x400" alt="slide" style={{ width: '100%' }} />
            </div>
            <div>
              <img src="https://via.placeholder.com/1200x400" alt="slide" style={{ width: '100%' }} />
            </div>
          </Carousel>
          <div style={{ padding: '50px 0' }}>
            <Row justify="center">
              <Col span={12}>
                <Title level={2} style={{ textAlign: 'center' }}>
                  Welcome to Our App
                </Title>
                <Paragraph style={{ textAlign: 'center', fontSize: '18px' }}>
                  A revolutionary app that will change your life!
                </Paragraph>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <Button type="primary" size="large">
                    Get Started
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <Divider />
          <Row gutter={16} style={{ padding: '50px 0' }}>
            <Col span={8}>
              <Card hoverable>
                <StarOutlined style={{ fontSize: '40px', marginBottom: '20px', display: 'block', textAlign: 'center' }} />
                <Title level={4} style={{ textAlign: 'center' }}>Great Features</Title>
                <Paragraph style={{ textAlign: 'center' }}>Discover amazing features that will blow your mind!</Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable>
                <DesktopOutlined style={{ fontSize: '40px', marginBottom: '20px', display: 'block', textAlign: 'center' }} />
                <Title level={4} style={{ textAlign: 'center' }}>Responsive Design</Title>
                <Paragraph style={{ textAlign: 'center' }}>Works seamlessly on all devices.</Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable>
                <HeartOutlined style={{ fontSize: '40px', marginBottom: '20px', display: 'block', textAlign: 'center' }} />
                <Title level={4} style={{ textAlign: 'center' }}>Customer Love</Title>
                <Paragraph style={{ textAlign: 'center' }}>See why our customers love us!</Paragraph>
              </Card>
            </Col>
          </Row>
          <Divider />
          <Row justify="center" style={{ padding: '50px 0' }}>
            <Col span={12}>
              <Title level={2} style={{ textAlign: 'center' }}>What Our Customers Say</Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Title level={4}>John Doe</Title>
                <Paragraph>Amazing app! I use it every day.</Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Title level={4}>Jane Smith</Title>
                <Paragraph>Easy to use and very helpful.</Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Title level={4}>Michael Brown</Title>
                <Paragraph>Best app I've ever used!</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
  );
};

export default LandingPage;
