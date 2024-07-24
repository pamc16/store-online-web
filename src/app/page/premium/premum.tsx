import { Modal } from 'antd';
import PhotoGallery from 'app/components/photo-gallery/photo-gallery';
import UploadPhoto from 'app/components/upload-photo/upload-photo';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState } from 'root-reducer';
import { setPreviewVisible, usePremiumSelector } from './slice/premium.slice';

const PremiumManager: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [uploadedImageUrl, setUploadedImageUrl] = useState<any>({});
	const { previewVisible, previewImage } = usePremiumSelector();

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

	useEffect(() => {
		if (!accessToken) {
			navigate('/unauthorized');
		}
	}, []);

	return (
		<div>
			<h1>Publicar Fotos</h1>
			<UploadPhoto onPhotoUploaded={handlePhotoUploaded} />
			<hr />
			<h2>Fotos Publicadas</h2>
			<PhotoGallery uploadedImageUrl={uploadedImageUrl} />
			<Modal
				open={previewVisible}
				title='Preview Image'
				footer={null}
				onCancel={handleCancel}
			>
				<img
					alt='example'
					style={{ width: '100%', height: '100%' }}
					src={previewImage}
				/>
			</Modal>
		</div>
	);
};

export default PremiumManager;
