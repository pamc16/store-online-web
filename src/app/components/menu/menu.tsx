import React, { useEffect, useState } from 'react';
import { Menu, Button, Drawer, Avatar } from 'antd';
import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import './menu.css';
import { Link, useNavigate } from 'react-router-dom';
import useTexts from '../../../hooks/use-text';
import { getUserByEmail, logoutUser } from 'services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import {
	setAccessToken,
	useLoginSelector,
} from 'app/page/login/slice/login.slice';
import { RootState } from 'root-reducer';
import LoadingComponent from '../loading/loading';

export interface CategoriaItems {
	categoria_id: number;
	nombre: string;
	path: string;
	image?: string;
	subcategorias?: SubCategoriasItems[];
}

interface SubCategoriasItems {
	subcategoria_id: number;
	nombre: string;
	path: string;
	image?: string;
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
			// Manejar éxito del cierre de sesión, redireccionar, mostrar mensaje, etc.
			dispatch(setAccessToken(''));
			onClose();
			navigate('/login');
		} catch (error) {
			// Manejar errores, como problemas de red, etc.
			console.error('Error al cerrar sesión:', error);
		}
	};

	const { texts, loading } = useTexts('andrii-page');

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
		<div className='container-menu'>
			<Button
				type='primary'
				className='drawer-button'
				onClick={showDrawer}
				icon={<MenuOutlined />}
			/>
			<Drawer
				title='Menú'
				placement='left'
				onClose={onClose}
				visible={visible}
				className='drawer'
			>
				<div className='drawer-header'>
					{accessToken && (
						<Avatar
							size={64}
							icon={<UserOutlined />}
							src={user.photo}
						/>
					)}
					<div className='user-info'>
						{accessToken && (
							<div className='user-name'>{`${user.firstName} ${user.lastName}`}</div>
						)}
						<Button
							onClick={() => handleAuth()}
							icon={
								accessToken ? (
									<LogoutOutlined />
								) : (
									<UserOutlined />
								)
							}
							className='logout-button'
						>
							{accessToken ? 'Cerrar Sesión' : 'Iniciar Sesión'}
						</Button>
					</div>
				</div>
				<Menu
					mode='vertical'
					defaultSelectedKeys={['1']}
					items={items}
				/>
			</Drawer>
		</div>
	);
};

export default MenuComponent;
