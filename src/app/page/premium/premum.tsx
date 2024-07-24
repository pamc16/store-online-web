import PhotoGallery from 'app/components/photo-gallery/photo-gallery';
import UploadPhoto from 'app/components/upload-photo/upload-photo';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState } from 'root-reducer';

const PremiumManager: React.FC = () => {
	const navigate = useNavigate();

	const [uploadedImageUrl, setUploadedImageUrl] = useState<any>({});

	const handlePhotoUploaded = (photo: {
		description: string;
		url: string;
	}) => {
		setUploadedImageUrl(photo);
	};

	const accessToken = useSelector(
		(state: RootState) => state.login.accessToken,
	);

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
		</div>
	);
};

export default PremiumManager;
