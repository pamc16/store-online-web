import React from "react";
import { Carousel } from "antd";
import "./carousel.css";

interface ProductosItems {
  producto_id: number;
  nombre: string;
  image: string;
  path: string;
}

interface CarouselComponentProps {
  productos: ProductosItems[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ productos }) => {
  return (
    <Carousel autoplay autoplaySpeed={3000} dots>
      {productos.map((producto, index) => (
        <div key={index}>
          <img src={producto.image} alt={producto.nombre} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
