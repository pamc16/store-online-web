import React, { ReactNode } from "react";
import { Layout } from "antd";
import HeaderComponent from "../components/header/header";
import CarouselComponent from "../components/carousel/carousel";
import CategoriaPage from "../page/categoria/categoria";
import FooterComponent from "../components/footer/footer";
import "./layout.css";
import Breadcrumbs from "../components/breadcrumb/breadcrumb";

const { Content } = Layout;

interface CustomLayoutProps {
  children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <Layout className="layout">
      <HeaderComponent />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumbs crumbs={[{ label: "label", path: "path" }]} />
        <div className="site-layout-content">{children}</div>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default CustomLayout;
