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

const MenuComponent: React.FC<MenuComponentProps> = ({ categorias }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { SubMenu } = Menu;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      <Button
        type="link"
        icon={<MenuOutlined className="menu-icon" onClick={toggleMenu} />}
        size="large"
      />
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <Menu mode="vertical" theme="dark">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Inicio</Link>
          </Menu.Item>
          {categorias.map((item, index) => (
            <SubMenu
              key={index}
              icon={<AppstoreOutlined />}
              title={item.nombre}
            >
              {item.subcategorias?.map((sub, index) => (
                <Menu.Item key={sub.nombre + index}>
                  <Link to={sub.path}>{sub.nombre}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default MenuComponent;
