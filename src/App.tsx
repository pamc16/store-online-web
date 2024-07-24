import { Content } from 'antd/es/layout/layout';
import RegistroUsuario from 'app/components/create-user/create-user';
import LoadingComponent from 'app/components/loading/loading';
import PasswordRecoveryForm from 'app/components/password-recovery/password-recovery';
import PremiumManager from 'app/page/premium/premum';
import UnauthorizedPage from 'app/page/unauthorized/unauthorized';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ProductCatalog from './app/components/product/catalog/product-catalog';
import ShoppingCartModal from './app/components/shopping-cart/modal/shopping-cart-modal';
import ShoppingCart from './app/components/shopping-cart/shopping-cart';
import CustomLayout from './app/layout/layout';
import Contact from './app/page/contact/contact';
import Features from './app/page/features/features';
import LandingPage from './app/page/landing-page/landing-page';
import Login from './app/page/login/login';
import LoginModal from './app/page/login/modal/login-modal';
import HomePage from './app/page/store/store';
import Testimonials from './app/page/testimonials/testimonials';
import { useDomain } from './hooks/use-domain';
import useTexts from './hooks/use-text';
import store from './store';
import './App.css';

const App: React.FC = () => {
	const domain = useDomain();
	const { loading, texts } = useTexts('andrii-page');

	if (loading) {
		return <LoadingComponent />;
	}

	return (
		<BrowserRouter basename='/landing'>
			<Provider store={store}>
				<CustomLayout>
					<Content>
						{/* <div className="sliding-container"> */}
						<Routes>
							<Route element={<LandingPage />} path='/inicio' />
							<Route element={<HomePage />} path='/tienda' />
							<Route
								element={<PremiumManager />}
								path='/premium'
							/>
							<Route
								element={<ShoppingCart />}
								path='/tienda/carrito-compras'
							/>
							<Route element={<Login />} path='/login' />
							<Route
								element={<ProductCatalog />}
								path='/tienda/productos'
							/>
							<Route element={<Features />} path='/trabajos' />
							<Route
								element={<Testimonials />}
								path='/testimonios'
							/>
							<Route element={<Contact />} path='/contacto' />
							<Route
								element={<RegistroUsuario />}
								path='/registro-usuario'
							/>
							<Route
								element={<PasswordRecoveryForm />}
								path='/registro-usuario/password-recovery'
							/>
							<Route
								element={<UnauthorizedPage />}
								path='/unauthorized'
							/>
						</Routes>
						{/* </div> */}

						<ShoppingCartModal />
						<LoginModal />
					</Content>
				</CustomLayout>
			</Provider>
		</BrowserRouter>
	);
};

export default App;
