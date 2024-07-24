import { Modal } from 'antd';
import React, { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../../root-reducer';
import Login from '../login';
import { setOpenModalLogin } from '../slice/login.slice';

const LoginModal: React.FC = () => {
	const openModal = useSelector(
		(state: RootState) => state.login.openModalLogin,
	);

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setOpenModalLogin(false));
	};

	return (
		<div>
			<Modal
				cancelButtonProps={{ style: { display: 'none' } }} // oculta el botón Cancel
				destroyOnClose={false}
				okButtonProps={{ style: { display: 'none' } }} // oculta el botón Ok
				onCancel={handleClose}
				onOk={handleClose}
				open={openModal}
				style={{ zIndex: 10_000 }}
			>
				<Login />{' '}
			</Modal>
		</div>
	);
};

export default LoginModal;
