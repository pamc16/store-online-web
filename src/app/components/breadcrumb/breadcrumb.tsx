import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './breadcrumb.css';

interface Crumb {
	label: string;
	path?: string;
}

interface BreadcrumbsProps {
	crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
	const items = crumbs.map((crumb, index) => {
		return {
			title: crumb.path ? (
				<Link to={crumb.path}>{crumb.label}</Link>
			) : (
				crumb.label
			),
		};
	});
	return <Breadcrumb className='breadcrumbs' items={items} />;
};

export default Breadcrumbs;
