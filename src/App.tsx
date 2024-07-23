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
import { Content } from 'antd/es/layout/layout';
import Features from './app/page/features/features';
import Testimonials from './app/page/testimonials/testimonials';
import Contact from './app/page/contact/contact';
import { useDomain } from './hooks/use-domain';
import useTexts from './hooks/use-text';
import PremiumManager from 'app/page/premium/premum';
import RegistroUsuario from 'app/components/create-user/create-user';
import PasswordRecoveryForm from 'app/components/password-recovery/password-recovery';
import UnauthorizedPage from 'app/page/unauthorized/unauthorized';
import LoadingComponent from 'app/components/loading/loading';

const App: React.FC = () => {
	const domain = useDomain();
	const { texts, loading } = useTexts('andrii-page');

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
								<Route path='/registro-usuario' element={<RegistroUsuario />} />
								<Route path='/registro-usuario/password-recovery' element={<PasswordRecoveryForm />} />
								<Route path='/unauthorized' element={<UnauthorizedPage />} />
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
