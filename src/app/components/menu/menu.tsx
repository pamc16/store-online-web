import React, { useState } from "react";
import { Layout, Menu, Input, Badge, Button } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import "./menu.css";
import { Link } from "react-router-dom";
import useTexts from "../../../hooks/use-text";

export interface CategoriaItems {
  categoria_id: number;
  nombre: string;
  path: string;
  image?: string;
  subcategorias?: SubCategoriasItems[];
}

interface SubCategoriasItems {
  subcategoria_id: number;
  nombre: string;
  path: string;
  image?: string;
}

interface MenuComponentProps {
  categorias: CategoriaItems[];
}

const MenuComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const { texts, loading } = useTexts();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container-menu">
      <Button
        type="link"
        icon={<MenuOutlined className="menu-icon" onClick={toggleMenu} />}
        size="large"
      />
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <Menu mode="vertical" theme="dark">
          {texts.menu.list.map((item: any, index: any) => (
            <Menu.Item
              key={item.key}
              title={item.name}
            >
              <Link to={item.path}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default MenuComponent;
