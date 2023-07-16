import React, { ReactNode } from "react";
import CarouselComponent from "../../components/carousel/carousel";
import CategoriaPage from "../categoria/categoria";

const HomePage: React.FC = () => {
  return (
    <div>
      <CarouselComponent
        productos={[
          {
            producto_id: 1,
            nombre: "imagen 1",
            image:
              "https://th.bing.com/th/id/R.81011afd51494723397023a1e0682a2f?rik=u%2fgIK7dMNiGBAA&pid=ImgRaw&r=0",
            path: "deportes/zapatillas",
          },
          {
            producto_id: 2,
            nombre: "imagen 2",
            image:
              "https://th.bing.com/th/id/OIP.PXDziNXjh-Y-B3eezT09OAHaE8?pid=ImgDet&rs=1",
            path: "deportes/poleras",
          },
        ]}
      />
      <CategoriaPage />
    </div>
  );
};

export default HomePage;
