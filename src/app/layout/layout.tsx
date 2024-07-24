import { Divider, Layout, Menu, Space } from 'antd';
import LoadingComponent from 'app/components/loading/loading';
import useTexts from 'hooks/use-text';
import React, { type ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { type RootState } from '../../root-reducer';
import Breadcrumbs from '../components/breadcrumb/breadcrumb';
import FooterComponent from '../components/footer/footer';
import HeaderComponent from '../components/header/header';
import { decrement, increment, incrementByAmount } from './slices/layout.slice';
import './layout.css';

const { Content } = Layout;

interface CustomLayoutProps {
	children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
	const categorias = useSelector(
		(state: RootState) => state.layout.categorias,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(increment());
		dispatch(decrement());
		dispatch(incrementByAmount(5));
	}, [dispatch]);
	useEffect(() => {}, []);
	const { loading, texts } = useTexts('andrii-page');

	if (loading) {
		return <LoadingComponent />;
	}

	const items = texts.menu.list.map((item: any) => {
		return {
			key: item.key,
			label: <Link to={item.path}>{item.name}</Link>,
			title: item.name,
		};
	});
	return (
		<Layout className='layout'>
			<div className='header-layout'>
				<HeaderComponent />
				<Menu
					className='menu-layout'
					items={items}
					mode='horizontal'
					theme='dark'
				/>
			</div>
			<Divider style={{ margin: '64px 0' }} />
			<Content style={{ padding: '0 50px' }}>
				<div className='site-layout-content'>{children}</div>
			</Content>
			<FooterComponent />
		</Layout>
	);
};

export default CustomLayout;
