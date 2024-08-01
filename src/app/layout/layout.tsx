import { Divider, Layout } from 'antd';
import LoadingComponent from 'app/components/loading/loading';
import { setAccessToken, setUser } from 'app/page/login/slice/login.slice';
import useTexts from 'hooks/use-text';
import { jwtDecode } from 'jwt-decode';
import React, { type ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from 'services/auth.service';
import FooterComponent from '../components/footer/footer';
import HeaderComponent from '../components/header/header';
import {
	decrement,
	increment,
	incrementByAmount,
	setSelectedTab,
} from './slices/layout.slice';
import './layout.css';

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

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(increment());
		dispatch(decrement());
		dispatch(incrementByAmount(5));
	}, [dispatch]);

	useEffect(() => {
		if (bearerToken) {
			dispatch(setAccessToken(bearerToken));
			void getUserByEmail(email).then((user) => {
				dispatch(setUser(user));
				dispatch(setSelectedTab('premium'));
				navigate('/premium');
			});
		}
	}, []);
	const { loading, texts } = useTexts('andrii-page');

	if (loading) {
		return <LoadingComponent />;
	}

	return (
		<Layout className='layout'>
			<div className='header-layout'>
				<HeaderComponent />
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
