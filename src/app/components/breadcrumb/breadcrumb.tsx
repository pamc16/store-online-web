import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import "./breadcrumb.css";

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <Breadcrumb className="breadcrumbs">
      {crumbs.map((crumb, index) => (
        <Breadcrumb.Item key={index}>
          {crumb.path ? (
            <Link to={crumb.path}>{crumb.label}</Link>
          ) : (
            crumb.label
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
