import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomLayout from "./app/layout/layout";
import HomePage from "./app/page/home/home";
import { Provider } from "react-redux";
import store from "./store";
import ShoppingCart from "./app/components/shopping-cart/shopping-cart";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <CustomLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/carrito-compras" element={<ShoppingCart />} />
          </Routes>
        </CustomLayout>
      </Router>
    </Provider>
  );
};

export default App;
