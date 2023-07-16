import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomLayout from "./app/layout/layout";
import HomePage from "./app/page/home/home";

const App: React.FC = () => {
  return (
    <Router>
      <CustomLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </CustomLayout>
    </Router>
  );
};

export default App;
