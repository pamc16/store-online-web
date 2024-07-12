import PhotoGallery from 'app/components/photo-gallery/photo-gallery';
import UploadPhoto from 'app/components/upload-photo/upload-photo';
import React, { useState } from 'react';

const PremiumManager: React.FC = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState<any>({});

    const handlePhotoUploaded = (photo: {url: string; description:string }) => {
      setUploadedImageUrl(photo);
    };
  
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