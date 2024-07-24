import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CarouselComponent from '../../components/carousel/carousel';
import CategoriaPage from '../categoria/categoria';
import { setShowShoppingCart } from './slice/store.slice';

const StorePage: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setShowShoppingCart(true));
	}, [dispatch]);
	return (
		<div>
			<CarouselComponent
				productos={[
					{
						image: 'https://th.bing.com/th/id/R.81011afd51494723397023a1e0682a2f?rik=u%2fgIK7dMNiGBAA&pid=ImgRaw&r=0',
						nombre: 'imagen 1',
						path: 'deportes/zapatillas',
						producto_id: 1,
					},
					{
						image: 'https://th.bing.com/th/id/OIP.PXDziNXjh-Y-B3eezT09OAHaE8?pid=ImgDet&rs=1',
						nombre: 'imagen 2',
						path: 'deportes/poleras',
						producto_id: 2,
					},
				]}
			/>
			<CategoriaPage />
		</div>
	);
};

export default StorePage;
