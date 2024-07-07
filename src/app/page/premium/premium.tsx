// src/components/PhotoGallery.tsx
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {  } from 'react-firebase-hooks/storage';
import { db, storage } from '../../../firebase';

const PhotoGallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [comment, setComment] = useState('');

  // Obtener imágenes desde Firebase Storage
  const [url, loading, error] = useStorage(storage.ref('images'));

  // Obtener comentarios desde Firestore
  const imagesRef = db.collection('images');
  const query = imagesRef.orderBy('createdAt');
  const [comments] = useCollectionData(query, { idField: 'id' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (imageFile) {
      const storageRef = storage.ref(`images/${imageFile.name}`);
      const uploadTask = storageRef.put(imageFile);

      setUploading(true);

      uploadTask.on('state_changed', null, (error: any) => {
        console.error('Error uploading image:', error);
      }, () => {
        storageRef.getDownloadURL().then((downloadURL: any) => {
          // Guardar la URL de la imagen en Firestore
          imagesRef.add({
            url: downloadURL,
            createdAt: new Date(),
          });
        });

        setUploading(false);
        setImageFile(null);
      });
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (imageId: string) => {
    imagesRef.doc(imageId).collection('comments').add({
      text: comment,
      createdAt: new Date(),
    });
    setComment('');
  };

  return (
    <div>
      <h2>Photo Gallery</h2>
      
      {/* Subida de imágenes */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !imageFile}>Upload</button>
      {uploading && <p>Uploading...</p>}

      {/* Mostrar imágenes */}
      <div>
        {url && <img src={url} alt="Uploaded" style={{ width: '100px', height: '100px' }} />}
      </div>

      {/* Mostrar comentarios */}
      <div>
        {comments && comments.map((image: any) => (
          <div key={image.id}>
            <img src={image.url} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
            <ul>
              {image.comments && image.comments.map((comment: any) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
            <input type="text" value={comment} onChange={handleCommentChange} />
            <button onClick={() => handleSubmitComment(image.id)}>Comment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
