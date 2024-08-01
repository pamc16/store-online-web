import { Modal } from 'antd';
import {
	setOpenModalUploadVideo,
	usePremiumSelector,
} from 'app/page/premium/slice/premium.slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import VideoUpload from '../video-upload';

const UploadVideoModal: React.FC = () => {
	const { openModalUploadVideo } = usePremiumSelector();

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(setOpenModalUploadVideo(false));
	};

	return (
		<div>
			<Modal
				cancelButtonProps={{ style: { display: 'none' } }} // oculta el botón Cancel
				destroyOnClose={false}
				okButtonProps={{ style: { display: 'none' } }} // oculta el botón Ok
				onCancel={handleClose}
				onOk={handleClose}
				open={openModalUploadVideo}
				style={{ zIndex: 10_000 }}
			>
				<VideoUpload />{' '}
			</Modal>
		</div>
	);
};

export default UploadVideoModal;
