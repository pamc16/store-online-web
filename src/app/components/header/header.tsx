import React, { useState } from "react";
import { Layout, Menu, Input, Badge, Button } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./header.css";
import ProductFilter from "../product/filter-product";
import MenuComponent from "../menu/menu";
import { Link } from "react-router-dom";
import { setOpenModalShoppingCart } from "../../layout/slices/layout.slice";
import { useDispatch } from "react-redux";
const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const dispatch = useDispatch();
  const showModal = (open: boolean) => {
    dispatch(setOpenModalShoppingCart(open));
  };
  return (
    <Header className="header">
      <MenuComponent
        categorias={[
          { categoria_id: 1, nombre: "Inicio", path: "/" },
          {
            categoria_id: 2,
            nombre: "Deportes",
            path: "/productos/deportes",
            subcategorias: [
              {
                nombre: "zapatillas",
                path: "/productos/deportes/zapatillas",
                subcategoria_id: 1,
              },
              {
                nombre: "camisetas de futbol",
                path: "/productos/deportes/camisetas-futbol",
                subcategoria_id: 2,
              },
            ],
          },
        ]}
      />
      <div className="logo">Nombre de la Tienda</div>
      <div className="search">
        <ProductFilter
          products={[
            "Producto 1",
            "Producto 2",
            "Producto 3",
            "Producto 4",
            "Producto 5",
            // Agrega más productos según sea necesario
          ]}
        />
      </div>
      <div className="actions">
        <Button
          type="link"
          icon={<ShoppingCartOutlined />}
          size="large"
          onClick={() => showModal(true)}
        >
          <Badge count={2}>Carrito de compras</Badge>
        </Button>
        <Button type="link" icon={<UserOutlined />} size="large">
          Iniciar Sesión
        </Button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
