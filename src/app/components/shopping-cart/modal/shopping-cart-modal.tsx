import { Modal } from 'antd';
import React, { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../../root-reducer';
import { setOpenModalShoppingCart } from '../../../layout/slices/layout.slice';
import ShoppingCart from '../shopping-cart';

const ShoppingCartModal: React.FC = () => {
	const openModal = useSelector(
		(state: RootState) => state.layout.openModalShoppingCart,
	);

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setOpenModalShoppingCart(false));
	};

	return (
		<div>
			<Modal
				destroyOnClose={true}
				onCancel={handleClose}
				onOk={handleClose}
				open={openModal}
				style={{ zIndex: 10_000 }}
				title='Carrito de Compras'
			>
				<ShoppingCart />{' '}
			</Modal>
		</div>
	);
};

export default ShoppingCartModal;
