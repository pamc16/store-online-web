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
import { setOpenModalShoppingCart } from "../../layout/slices/layout.slice";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalLogin } from "../../page/login/slice/login.slice";
import { RootState } from "../../../root-reducer";
import useTexts from "../../../hooks/use-text";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const dispatch = useDispatch();

  const showModal = (open: boolean) => {
    dispatch(setOpenModalShoppingCart(open));
  };

  const showModalLogin = (open: boolean) => {
    dispatch(setOpenModalLogin(open));
  };

  const showShoppingCart = useSelector(
    (state: RootState) => state.store.showShoppingCart
  );
  const { texts, loading } = useTexts();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Header className="header">
      <MenuComponent
      />
      <div className="logo">{texts.header['name_page']}</div>
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
          onClick={() => showModal(showShoppingCart)}
          disabled={!showShoppingCart}
          style={!showShoppingCart ? {display: 'none'} : {}}
        >
          <Badge count={2}>Carrito de compras</Badge>
        </Button>
        <Button
          type="link"
          onClick={() => showModalLogin(true)}
          icon={<UserOutlined />}
          size="large"
        >
          {texts.header['session_on']}
        </Button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
