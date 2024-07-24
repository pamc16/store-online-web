import { Carousel } from 'antd';
import React from 'react';
import './carousel.css';

interface ProductosItems {
	image: string;
	nombre: string;
	path: string;
	producto_id: number;
}

interface CarouselComponentProps {
	productos: ProductosItems[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ productos }) => {
	return (
		<Carousel autoplay autoplaySpeed={3000} dots>
			{productos.map((producto, index) => (
				<div key={index}>
					<img alt={producto.nombre} src={producto.image} />
				</div>
			))}
		</Carousel>
	);
};

export default CarouselComponent;
