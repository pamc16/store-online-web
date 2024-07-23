import React from 'react';
import { Layout, Badge, Button, Avatar } from 'antd';
import {
	LogoutOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import './header.css';
import ProductFilter from '../product/filter-product';
import MenuComponent from '../menu/menu';
import { setOpenModalShoppingCart } from '../../layout/slices/layout.slice';
import { useDispatch, useSelector } from 'react-redux';
import {
	setOpenModalLogin,
	useLoginSelector,
} from '../../page/login/slice/login.slice';
import { RootState } from '../../../root-reducer';
import useTexts from '../../../hooks/use-text';
import LoadingComponent from '../loading/loading';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
	const dispatch = useDispatch();

	const { accessToken, user } = useLoginSelector();

	const showModal = (open: boolean) => {
		dispatch(setOpenModalShoppingCart(open));
	};

	const showModalLogin = (open: boolean) => {
		dispatch(setOpenModalLogin(open));
	};

	const showShoppingCart = useSelector(
		(state: RootState) => state.store.showShoppingCart,
	);
	const { texts, loading } = useTexts('andrii-page');

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
						// Agrega más productos según sea necesario
					]}
				/>
			</div>
			{accessToken && <Avatar size={64} icon={<UserOutlined />} src={user.photo} />}
			{accessToken && <div className='user-name'>{`${user.firstName} ${user.lastName}`}</div>}
			<div className='actions'>
				<Button
					type='link'
					icon={<ShoppingCartOutlined />}
					size='large'
					onClick={() => showModal(showShoppingCart)}
					disabled={!showShoppingCart}
					style={!showShoppingCart ? { display: 'none' } : {}}
				>
					<Badge count={2}>Carrito de compras</Badge>
				</Button>
				<Button
					type='link'
					onClick={() => showModalLogin(true)}
					icon={accessToken ? <LogoutOutlined /> : <UserOutlined />}
					size='large'
				>
					{accessToken ? 'Cerrar Sesión' : texts.header['session_on']}
				</Button>
			</div>
		</Header>
	);
};

export default HeaderComponent;
