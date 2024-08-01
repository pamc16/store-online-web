import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import PhotoGallery from 'app/components/photo-gallery/photo-gallery';
import UploadFileModal from 'app/components/upload-photo/modal/modal-upload-photo';
import UploadPhoto from 'app/components/upload-photo/upload-photo';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState } from 'root-reducer';
import {
	setOpenModalUploadFile,
	setOpenModalUploadVideo,
	setPreviewVisible,
	usePremiumSelector,
} from './slice/premium.slice';
import './premium.css';
import UploadVideoModal from 'app/components/video-upload/modal/modal-video-upload';

const PremiumManager: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [uploadedImageUrl, setUploadedImageUrl] = useState<any>({});
	const { previewImage, previewVisible } = usePremiumSelector();

	const handlePhotoUploaded = (photo: {
		description: string;
		url: string;
	}) => {
		setUploadedImageUrl(photo);
	};

	const accessToken = useSelector(
		(state: RootState) => state.login.accessToken,
	);

	const handleCancel = () => dispatch(setPreviewVisible(false));

	const handleOpenModalUploadFile = (open: boolean) => {
		dispatch(setOpenModalUploadFile(open));
	};

	const handleOpenModalUploadVideo = (open: boolean) => {
		dispatch(setOpenModalUploadVideo(open));
	};

	useEffect(() => {
		if (!accessToken) {
			navigate('/unauthorized');
		}
	}, []);

	return (
		<div className='container'>
			<h1>Agrega tu contenido</h1>
			<Button
				className='open-modal-button'
				icon={<PlusOutlined />}
				onClick={() => handleOpenModalUploadFile(true)}
				type='primary'
			></Button>
			<Button
				className='open-modal-button'
				icon={<PlusOutlined />}
				onClick={() => handleOpenModalUploadVideo(true)}
				type='default'
			></Button>
			<hr />
			<h2>Fotos Publicadas</h2>
			<PhotoGallery uploadedImageUrl={uploadedImageUrl} />
			<Modal
				footer={null}
				onCancel={handleCancel}
				open={previewVisible}
				title='Preview Image'
			>
				<img
					alt='example'
					src={previewImage}
					style={{ height: '100%', width: '100%' }}
				/>
			</Modal>
			<UploadFileModal onPhotoUploaded={handlePhotoUploaded} />
			<UploadVideoModal />
		</div>
	);
};

export default PremiumManager;
