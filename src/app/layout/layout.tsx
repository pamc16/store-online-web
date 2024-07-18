import React, { ReactNode, useEffect } from 'react';
import { Divider, Layout, Menu, Space } from 'antd';
import HeaderComponent from '../components/header/header';
import FooterComponent from '../components/footer/footer';
import './layout.css';
import Breadcrumbs from '../components/breadcrumb/breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../root-reducer';
import { decrement, increment, incrementByAmount } from './slices/layout.slice';
import { Link } from 'react-router-dom';
import useTexts from 'hooks/use-text';
import LoadingComponent from 'app/components/loading/loading';

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
	const { texts, loading } = useTexts();

	if (loading) {
		return <LoadingComponent />;
	}

	const items = texts.menu.list.map((item: any) => {
		return {
			key: item.key,
			title: item.name,
			label: <Link to={item.path}>{item.name}</Link>,
		};
	});
	return (
		<Layout className='layout'>
			<div className='header-layout'>
				<HeaderComponent />
				<Menu theme='dark' mode='horizontal' items={items} className='menu-layout' />
			</div>
      <Divider style={{margin: '64px 0'}} />
			<Content style={{ padding: '0 50px' }}>
				<div className='site-layout-content'>{children}</div>
			</Content>
			<FooterComponent />
		</Layout>
	);
};

export default CustomLayout;
