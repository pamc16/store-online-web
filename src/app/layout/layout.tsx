import React, { ReactNode, useEffect } from "react";
import { Layout } from "antd";
import HeaderComponent from "../components/header/header";
import FooterComponent from "../components/footer/footer";
import "./layout.css";
import Breadcrumbs from "../components/breadcrumb/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../root-reducer";
import { decrement, increment, incrementByAmount } from "./slices/layout.slice";

const { Content } = Layout;

interface CustomLayoutProps {
  children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  const categorias = useSelector((state: RootState) => state.layout.categorias);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(increment());
    dispatch(decrement());
    dispatch(incrementByAmount(5));
  }, []);
  useEffect(()=>{
	},[])
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
