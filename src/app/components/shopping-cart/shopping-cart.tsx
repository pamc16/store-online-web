import { DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import React from 'react';

interface Product {
	key: string;
	price: string;
	productName: string;
	quantity: number;
	subtotal: string;
}

const columns = [
	{
		dataIndex: 'productName',
		key: 'productName',
		title: 'Producto',
	},
	{
		dataIndex: 'price',
		key: 'price',
		title: 'Precio Unitario',
	},
	{
		dataIndex: 'quantity',
		key: 'quantity',
		title: 'Cantidad',
	},
	{
		dataIndex: 'subtotal',
		key: 'subtotal',
		title: 'Subtotal',
	},
	{
		key: 'action',
		render: (text: any, record: Product) => (
			<Space size='middle'>
				<a href='#' onClick={() => console.log(record.key)}>
					<DeleteOutlined />
				</a>
			</Space>
		),
		title: 'Acción',
	},
];

const data: Product[] = [
	{
		key: '1',
		price: '$20.00',
		productName: 'Producto 1',
		quantity: 2,
		subtotal: '$40.00',
	},
	{
		key: '2',
		price: '$15.00',
		productName: 'Producto 2',
		quantity: 3,
		subtotal: '$45.00',
	},
	// agrega más productos aquí
];

const ShoppingCart: React.FC = () => {
	const handleDelete = (key: string) => {
		// implementa la lógica para eliminar un producto del carrito
	};

	return (
		<div>
			<Table columns={columns} dataSource={data} />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '20px',
				}}
			>
				<Button type='primary'>Finalizar Compra</Button>
				<Button danger>Eliminar Todo</Button>
			</div>
			<p>Total: $85.00</p>
		</div>
	);
};

export default ShoppingCart;
