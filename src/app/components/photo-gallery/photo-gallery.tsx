import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { storage, store } from 'firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
	type ListResult,
	type StorageReference,
	getDownloadURL,
	getMetadata,
	listAll,
	ref,
} from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import LazyLoadImage from './lazy-load-image/lazy-load-image';
import './photo-gallery.css';

interface ShowPhotosProps {
	uploadedImageUrl: any;
}

const ShowPhotos: React.FC<ShowPhotosProps> = ({ uploadedImageUrl }) => {
	const [photoUrls, setPhotoUrls] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [visibleImages, setVisibleImages] = useState<number>(4); // cantidad inicial de imágenes visibles

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight ||
			loading
		) {
			return;
		}
		setLoading(true);
		setTimeout(() => {
			setVisibleImages((prev) => prev + 4); // añadir más imágenes al estado visible
			setLoading(false);
		}, 1000); // simulación de carga, ajusta según tu lógica real
	};

	useEffect(() => {
		const fetchPhotos = async () => {
			const imagesRef = ref(storage, 'images');

			try {
				// listar todos los archivos (imágenes) en la carpeta 'images'
				const listResult: ListResult = await listAll(imagesRef);
				const imagesCollection = await getDocs(
					collection(store, 'images'),
				);
				const imagesData = await Promise.all(
					imagesCollection.docs.map((doc) => ({
						id: doc.id,
						...(doc.data() as {
							createdAt: string;
							description: string;
							downloadURL: string;
							name: string;
						}),
					})),
				);

				// obtener URLs de descarga de cada imagen encontrada
				const urls = await Promise.all(
					listResult.items.map(async (item: StorageReference) => {
						const image = imagesData.find(
							(data) => data.name === item.name,
						);
						return {
							descripcion: image?.description,
							url: image?.downloadURL,
						};
					}),
				);

				setPhotoUrls(urls);
				setLoading(false);
			} catch (error) {
				console.error('Error al obtener las imágenes:', error);
				setLoading(false);
			}
		};

		fetchPhotos();
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<Row gutter={[16, 16]}>
			{uploadedImageUrl.url && (
				<Col lg={6} md={8} sm={12} xs={24}>
					<LazyLoadImage
						description={uploadedImageUrl.description}
						imageUrl={uploadedImageUrl.url}
						index={0}
					/>
				</Col>
			)}
			{photoUrls.slice(0, visibleImages).map((photo: any, index: any) => (
				<Col key={index} lg={6} md={8} sm={12} xs={24}>
					<LazyLoadImage
						description={photo.descripcion}
						imageUrl={photo.url}
						index={index + 1}
					/>
				</Col>
			))}
			{loading && (
				<div
					style={{
						marginTop: '16px',
						textAlign: 'center',
						width: '100%',
					}}
				>
					<LoadingOutlined style={{ fontSize: '24px' }} />
				</div>
			)}
		</Row>
	);
};
export default ShowPhotos;
