import {
	LogoutOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { type AppDispatch } from 'store';
import useTexts from '../../../hooks/use-text';
import { type RootState } from '../../../root-reducer';
import {
	setOpenModalShoppingCart,
	setSelectedTab,
	useLayoutSelector,
} from '../../layout/slices/layout.slice';
import {
	setOpenModalLogin,
	useLoginSelector,
} from '../../page/login/slice/login.slice';
import LoadingComponent from '../loading/loading';
import MenuComponent, { handleAuth } from '../menu/menu';
import ProductFilter from '../product/filter-product';
import './header.css';

export const handleClickMenu = (menu: any, dispatch: AppDispatch) => {
	dispatch(setSelectedTab(menu.key as string));
};

const bearerToken = localStorage.getItem('accessToken') as string;

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { accessToken, user } = useLoginSelector();
	const { selectedTab } = useLayoutSelector();

	const showModal = (open: boolean) => {
		dispatch(setOpenModalShoppingCart(open));
	};

	const handleLogin = (open: boolean) => {
		if (bearerToken ?? accessToken) {
			void handleAuth(dispatch, navigate);
		} else {
			dispatch(setOpenModalLogin(open));
		}
	};

	const showShoppingCart = useSelector(
		(state: RootState) => state.store.showShoppingCart,
	);
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
		<Header className='header'>
			{' '}
			<MenuComponent />
			<div className='logo'>{texts.header['name_page']}</div>
			{/* <div className='search'>
				<ProductFilter
					products={[
						'Producto 1',
						'Producto 2',
						'Producto 3',
						'Producto 4',
						'Producto 5',
						// agrega más productos según sea necesario
					]}
				/>
			</div> */}
			<Menu
				className='menu-layout'
				defaultActiveFirst={true}
				defaultSelectedKeys={[selectedTab]}
				items={items}
				mode='horizontal'
				onClick={(menu) => handleClickMenu(menu, dispatch)}
				selectable={true}
				selectedKeys={[selectedTab]}
				theme='dark'
			/>
			{accessToken && (
				<div className='avatar'>
					<Avatar
						icon={<UserOutlined />}
						size={64}
						src={user.photo}
					/>
					<div className='user-name'>{`${user.firstName} ${user.lastName}`}</div>
				</div>
			)}
			<div className='actions'>
				<Button
					disabled={!showShoppingCart}
					icon={<ShoppingCartOutlined />}
					onClick={() => showModal(showShoppingCart)}
					size='large'
					style={showShoppingCart ? {} : { display: 'none' }}
					type='link'
				>
					<Badge count={2}>Carrito de compras</Badge>
				</Button>
				<Button
					icon={accessToken ? <LogoutOutlined /> : <UserOutlined />}
					onClick={() => handleLogin(true)}
					size='large'
					type='link'
				>
					{accessToken
						? texts.header['session_off']
						: texts.header['session_on']}
				</Button>
			</div>
		</Header>
	);
};

export default HeaderComponent;
