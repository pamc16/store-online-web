import React from "react";
import { Table, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Product {
  key: string;
  productName: string;
  price: string;
  quantity: number;
  subtotal: string;
}

const columns = [
  {
    title: "Producto",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Precio Unitario",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Subtotal",
    dataIndex: "subtotal",
    key: "subtotal",
  },
  {
    title: "Acción",
    key: "action",
    render: (text: any, record: Product) => (
      <Space size="middle">
        <a onClick={() => console.log(record.key)}>
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];

const data: Product[] = [
  {
    key: "1",
    productName: "Producto 1",
    price: "$20.00",
    quantity: 2,
    subtotal: "$40.00",
  },
  {
    key: "2",
    productName: "Producto 2",
    price: "$15.00",
    quantity: 3,
    subtotal: "$45.00",
  },
  // Agrega más productos aquí
];

const ShoppingCart: React.FC = () => {
  const handleDelete = (key: string) => {
    // Implementa la lógica para eliminar un producto del carrito
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button type="primary">Finalizar Compra</Button>
        <Button danger>Eliminar Todo</Button>
      </div>
      <p>Total: $85.00</p>
    </div>
  );
};

export default ShoppingCart;
