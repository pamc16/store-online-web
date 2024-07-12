import React, { useState } from "react";
import { Menu, Button } from "antd";
import {
  MenuOutlined,
} from "@ant-design/icons";
import "./menu.css";
import { Link, useLocation } from "react-router-dom";
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

const MenuComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const { texts, loading } = useTexts();

  if (loading) {
    return <p>Loading...</p>;
  }

  const items = texts.menu.list.map((item: any) => {
		return {
			key: item.key,
      title: item.name,
			label: <Link to={item.path}>{item.name}</Link>,
		};
	});

  return (
    <div className="container-menu">
      <Button
        type="link"
        icon={<MenuOutlined className="menu-icon" onClick={toggleMenu} />}
        size="large"
      />
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <Menu mode="vertical" theme="dark" items={items} selectedKeys={[location.pathname]}/>
      </div>
    </div>
  );
};

export default MenuComponent;
