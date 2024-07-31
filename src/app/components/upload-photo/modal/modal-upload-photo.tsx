import { Modal } from 'antd';
import {
	setOpenModalUploadFile,
	usePremiumSelector,
} from 'app/page/premium/slice/premium.slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import UploadPhoto, { type UploadPhotoProps } from '../upload-photo';

const UploadFileModal: React.FC<UploadPhotoProps> = ({ onPhotoUploaded }) => {
	const { openModalUploadFile } = usePremiumSelector();

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setOpenModalUploadFile(false));
	};

	return (
		<div>
			<Modal
				cancelButtonProps={{ style: { display: 'none' } }} // oculta el botón Cancel
				destroyOnClose={false}
				okButtonProps={{ style: { display: 'none' } }} // oculta el botón Ok
				onCancel={handleClose}
				onOk={handleClose}
				open={openModalUploadFile}
				style={{ zIndex: 10_000 }}
			>
				<UploadPhoto onPhotoUploaded={onPhotoUploaded} />{' '}
			</Modal>
		</div>
	);
};

export default UploadFileModal;
