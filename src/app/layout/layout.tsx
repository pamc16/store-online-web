import { Divider, Layout, Menu } from 'antd';
import LoadingComponent from 'app/components/loading/loading';
import useTexts from 'hooks/use-text';
import React, { type ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FooterComponent from '../components/footer/footer';
import HeaderComponent from '../components/header/header';
import {
	decrement,
	increment,
	incrementByAmount,
	setSelectedTab,
	useLayoutSelector,
} from './slices/layout.slice';
import './layout.css';
import { AppDispatch } from 'store';
import { jwtDecode } from 'jwt-decode';
import { setAccessToken, setUser } from 'app/page/login/slice/login.slice';
import { getUserByEmail } from 'services/auth.service';

const bearerToken = localStorage.getItem('accessToken') as string;
let email: string;
if (bearerToken) {
	const tokenDecoded: any = jwtDecode(bearerToken);
	email = tokenDecoded.email;
}


const { Content } = Layout;

interface CustomLayoutProps {
	children: ReactNode;
}

export const handleClickMenu = (menu: any, dispatch: AppDispatch) => {
	dispatch(setSelectedTab(menu.key as string));
};

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
	const dispatch = useDispatch();
	const { selectedTab } = useLayoutSelector();

	useEffect(() => {
		dispatch(increment());
		dispatch(decrement());
		dispatch(incrementByAmount(5));
	}, [dispatch]);
	useEffect(() => {}, []);

	useEffect(() => {
		if (bearerToken) {
			dispatch(setAccessToken(bearerToken));
			getUserByEmail(email).then((user) => {
				dispatch(setUser(user));
				dispatch(setSelectedTab('premium'));
			});
		}
	}, []);
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
					defaultSelectedKeys={[selectedTab]}
					defaultActiveFirst={true}
					selectable={true}
					selectedKeys={[selectedTab]}
					onClick={(menu) => handleClickMenu(menu, dispatch)}
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
