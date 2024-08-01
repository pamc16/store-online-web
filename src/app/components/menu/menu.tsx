import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Menu, notification } from 'antd';
import { setSelectedTab, useLayoutSelector } from 'app/layout/slices/layout.slice';
import {
	setAccessToken,
	setOpenModalLogin,
	useLoginSelector,
} from 'app/page/login/slice/login.slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, type NavigateFunction, useNavigate } from 'react-router-dom';
import { logoutUser } from 'services/auth.service';
import { type AppDispatch } from 'store';
import useTexts from '../../../hooks/use-text';
import { handleClickMenu } from '../header/header';
import LoadingComponent from '../loading/loading';
import './menu.css';

export const handleAuth = async (
	dispatch: AppDispatch,
	navigate: NavigateFunction,
	onClose?: () => void,
) => {
	const bearerToken = localStorage.getItem('accessToken') as string;
	try {
		if (bearerToken) {
			await logoutUser();
			// manejar éxito del cierre de sesión, redireccionar, mostrar mensaje, etc.
			dispatch(setAccessToken(''));
			dispatch(setSelectedTab('landing_page'));
			localStorage.clear();
			onClose && onClose();
			navigate('/inicio');
			notification.success({
				description: 'Sesión cerrada exitosamente',
				message: 'Cerrando Sesión',
			});
		} else {
			dispatch(setOpenModalLogin(true));
			onClose && onClose();
		}
	} catch (error) {
		// manejar errores, como problemas de red, etc.
		console.error('Error al cerrar sesión:', error);
	}
};

export interface CategoriaItems {
	categoria_id: number;
	image?: string;
	nombre: string;
	path: string;
	subcategorias?: SubCategoriasItems[];
}

interface SubCategoriasItems {
	image?: string;
	nombre: string;
	path: string;
	subcategoria_id: number;
}

const MenuComponent: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);
	const { accessToken, user } = useLoginSelector();
	const { selectedTab } = useLayoutSelector();

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

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
		<div className='container-menu'>
			<Button
				className='drawer-button'
				icon={<MenuOutlined />}
				onClick={showDrawer}
				type='primary'
			/>
			<Drawer
				className='drawer'
				onClose={onClose}
				open={visible}
				placement='left'
				title='Menú'
			>
				<div className='drawer-header'>
					{accessToken && (
						<Avatar
							icon={<UserOutlined />}
							size={64}
							src={user.photo}
						/>
					)}
					<div className='user-info'>
						{accessToken && (
							<div className='user-name'>{`${user.firstName} ${user.lastName}`}</div>
						)}
						<Button
							className='logout-button'
							icon={
								accessToken ? (
									<LogoutOutlined />
								) : (
									<UserOutlined />
								)
							}
							onClick={() =>
								handleAuth(dispatch, navigate, onClose)
							}
						>
							{accessToken ? 'Cerrar Sesión' : 'Iniciar Sesión'}
						</Button>
					</div>
				</div>
				<Menu
					defaultSelectedKeys={[selectedTab]}
					items={items}
					mode='vertical'
					onClick={(menu) => handleClickMenu(menu, dispatch)}
					selectedKeys={[selectedTab]}
				/>
			</Drawer>
		</div>
	);
};

export default MenuComponent;
