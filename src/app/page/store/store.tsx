import React, { useEffect } from "react";
import CarouselComponent from "../../components/carousel/carousel";
import CategoriaPage from "../categoria/categoria";
import { useDispatch } from "react-redux";
import { setShowShoppingCart } from "./slice/store.slice";

const StorePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setShowShoppingCart(true))
  },[dispatch])
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

export default StorePage;
