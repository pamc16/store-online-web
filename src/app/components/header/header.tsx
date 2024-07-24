import {
	LogoutOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Layout } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTexts from '../../../hooks/use-text';
import { type RootState } from '../../../root-reducer';
import { setOpenModalShoppingCart } from '../../layout/slices/layout.slice';
import {
	setAccessToken,
	setOpenModalLogin,
	useLoginSelector,
} from '../../page/login/slice/login.slice';
import LoadingComponent from '../loading/loading';
import MenuComponent, { handleAuth } from '../menu/menu';
import ProductFilter from '../product/filter-product';
import './header.css';
import { useNavigate } from 'react-router-dom';

const bearerToken = localStorage.getItem('accessToken') as string;

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { accessToken, user } = useLoginSelector();

	const showModal = (open: boolean) => {
		dispatch(setOpenModalShoppingCart(open));
	};

	const handleLogin = (open: boolean) => {
		if (bearerToken ?? accessToken) {
			handleAuth(dispatch, navigate);
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

	return (
		<Header className='header'>
			{' '}
			<MenuComponent />
			<div className='logo'>{texts.header['name_page']}</div>
			<div className='search'>
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
			</div>
			{accessToken && (
				<Avatar icon={<UserOutlined />} size={64} src={user.photo} />
			)}
			{accessToken && (
				<div className='user-name'>{`${user.firstName} ${user.lastName}`}</div>
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
