import React from 'react';
import { Result, Button, Typography } from 'antd';
import { Link } from 'react-router-dom'; // Importa Link si estás usando React Router
import { RollbackOutlined } from '@ant-design/icons'; // Importa iconos de Ant Design

const UnauthorizedPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Result
        status="403"
        title={
          <Typography.Title level={1} style={{ marginBottom: 0, color: '#fa541c', fontWeight: 'bold', fontSize: 48 }}>
            ¡Ups!
          </Typography.Title>
        }
        subTitle={
          <Typography.Paragraph style={{ fontSize: 24, marginTop: 24 }}>
            No estás autorizado para acceder a esta página.
          </Typography.Paragraph>
        }
        extra={
          <Button type="primary" size="large" icon={<RollbackOutlined />} style={{ marginTop: 24 }}>
            <Link to="/">Volver a Inicio</Link>
          </Button>
        }
      />
    </div>
  );
};

export default UnauthorizedPage;
