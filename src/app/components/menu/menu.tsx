import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Menu } from 'antd';
import {
	setAccessToken,
	useLoginSelector,
} from 'app/page/login/slice/login.slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from 'root-reducer';
import { getUserByEmail, logoutUser } from 'services/auth.service';
import useTexts from '../../../hooks/use-text';
import LoadingComponent from '../loading/loading';
import './menu.css';

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

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const handleAuth = async () => {
		try {
			await logoutUser();
			// manejar éxito del cierre de sesión, redireccionar, mostrar mensaje, etc.
			dispatch(setAccessToken(''));
			onClose();
			navigate('/login');
		} catch (error) {
			// manejar errores, como problemas de red, etc.
			console.error('Error al cerrar sesión:', error);
		}
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
				placement='left'
				title='Menú'
				visible={visible}
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
							onClick={() => handleAuth()}
						>
							{accessToken ? 'Cerrar Sesión' : 'Iniciar Sesión'}
						</Button>
					</div>
				</div>
				<Menu
					defaultSelectedKeys={['1']}
					items={items}
					mode='vertical'
				/>
			</Drawer>
		</div>
	);
};

export default MenuComponent;
