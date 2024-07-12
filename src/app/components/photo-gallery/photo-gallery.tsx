import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL, listAll, getMetadata, ListResult, StorageReference } from 'firebase/storage';
import { storage, store } from 'firebase';
import './photo-gallery.css';
import {  Col, Row } from 'antd';
import LazyLoadImage from './lazy-load-image/lazy-load-image';
import { LoadingOutlined } from '@ant-design/icons';
import { collection, getDocs } from 'firebase/firestore';

interface ShowPhotosProps {
	uploadedImageUrl: any
}

const ShowPhotos: React.FC<ShowPhotosProps> = ({ uploadedImageUrl }) => {
	const [photoUrls, setPhotoUrls] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
  const [visibleImages, setVisibleImages] = useState<number>(4); // Cantidad inicial de imágenes visibles

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setVisibleImages(prev => prev + 4); // Añadir más imágenes al estado visible
      setLoading(false);
    }, 1000); // Simulación de carga, ajusta según tu lógica real
  };

	useEffect(() => {
		const fetchPhotos = async () => {
			const imagesRef = ref(storage, 'images');

			try {
				// Listar todos los archivos (imágenes) en la carpeta 'images'
				const listResult: ListResult = await listAll(imagesRef);
        const imagesCollection = await getDocs(collection(store, 'images'));
        const imagesData = await Promise.all(imagesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() as { downloadURL: string, description: string, createdAt: string, name: string } })));

				// Obtener URLs de descarga de cada imagen encontrada
				const urls = await Promise.all(
					listResult.items.map(async (item: StorageReference) => {
            const image = imagesData.find((data)=> data.name === item.name);
            return {url: image?.downloadURL, descripcion: image?.description}
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
        <Col xs={24} sm={12} md={8} lg={6}>
        <LazyLoadImage imageUrl={uploadedImageUrl.url} index={0} description={uploadedImageUrl.description} />
      </Col>
      )}
      {photoUrls.slice(0, visibleImages).map((photo: any, index: any) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <LazyLoadImage imageUrl={photo.url} index={index+1} description={photo.descripcion} />
        </Col>
      ))}
      {loading && (
        <div style={{ width: '100%', textAlign: 'center', marginTop: '16px' }}>
          <LoadingOutlined style={{ fontSize: '24px' }} />
        </div>
      )}
    </Row>
	);
};
export default ShowPhotos;
