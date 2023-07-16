import React, { useState } from "react";
import { Layout, Menu, Input, Badge, Button } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./menu.css";
import { Link } from "react-router-dom";

interface CategoriaItems {
  categoria_id: number;
  nombre: string;
  path: string;
  image?: string;
}

interface MenuComponentProps {
  categorias: CategoriaItems[];
}

const MenuComponent: React.FC<MenuComponentProps> = ({ categorias }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        {categorias.map((item, index) => (
          <Menu mode="vertical" theme="dark">
            <Menu.Item key={index} icon={<HomeOutlined />}>
              <Link to={item.path}>{item.nombre}</Link>
            </Menu.Item>
          </Menu>
        ))}
      </div>
    </div>
  );
};

export default MenuComponent;
