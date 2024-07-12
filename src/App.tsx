import React from 'react';
import './App.css';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import CustomLayout from './app/layout/layout';
import HomePage from './app/page/store/store';
import { Provider } from 'react-redux';
import store from './store';
import ShoppingCart from './app/components/shopping-cart/shopping-cart';
import Login from './app/page/login/login';
import ProductCatalog from './app/components/product/catalog/product-catalog';
import ShoppingCartModal from './app/components/shopping-cart/modal/shopping-cart-modal';
import LoginModal from './app/page/login/modal/login-modal';
import LandingPage from './app/page/landing-page/landing-page';
import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Features from './app/page/features/features';
import Testimonials from './app/page/testimonials/testimonials';
import Contact from './app/page/contact/contact';
import { useDomain } from './hooks/use-domain';
import useTexts from './hooks/use-text';
import PremiumManager from 'app/page/premium/premum';

const App: React.FC = () => {
	const domain = useDomain();
	const { texts, loading } = useTexts();

	if (loading) {
		return <p>Loading...</p>;
	}

	const items = texts.menu.list.map((item: any) => {
		return {
			key: item.key,
      title: item.name,
			label: <Link to={item.path}>{item.name}</Link>,
		};
	});

	return (
		<BrowserRouter basename='/landing'>
			<Provider store={store}>
				<CustomLayout>
					<Layout>
						<Header style={{ zIndex: 1, width: '100%' }}>
							<div className='logo' />
							<Menu
								theme='dark'
								mode='horizontal'
								items={items}
							/>
						</Header>
						<Content style={{ marginTop: 20 }}>
							{/* <div className="sliding-container"> */}
							<Routes>
								<Route
									path='/inicio'
									element={<LandingPage />}
								/>
								<Route path='/tienda' element={<HomePage />} />
								<Route path='/premium' element={<PremiumManager />} />
								<Route
									path='/tienda/carrito-compras'
									element={<ShoppingCart />}
								/>
								<Route path='/login' element={<Login />} />
								<Route
									path='/tienda/productos'
									element={<ProductCatalog />}
								/>
								<Route
									path='/trabajos'
									element={<Features />}
								/>
								<Route
									path='/testimonios'
									element={<Testimonials />}
								/>
								<Route path='/contacto' element={<Contact />} />
							</Routes>
							{/* </div> */}
							
							<ShoppingCartModal />
							<LoginModal />
						</Content>
						<Footer style={{ textAlign: 'center' }}>
							Ant Design ©2023 Created by Ant UED
						</Footer>
					</Layout>
				</CustomLayout>
			</Provider>
		</BrowserRouter>
	);
};

export default App;
