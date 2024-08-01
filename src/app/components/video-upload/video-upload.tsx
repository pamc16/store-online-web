/* eslint-disable jsx-a11y/media-has-caption */
// videoUpload.tsx
import { PlayCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Progress, Typography, Upload, message } from 'antd';
import { app } from 'firebase';
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import uploadAnimationData from './animation/upload.json';
import './video-upload.css';

const { Title } = Typography;

const VideoUpload: React.FC = () => {
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const handleUpload = (file: File) => {
        console.log(file)
		const storage = getStorage(app);
		const storageRef = ref(storage, `videos/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
			},
			(error) => {
				void message.error(`Upload failed: ${error.message}`);
			},
			() => {
				void getDownloadURL(uploadTask.snapshot.ref).then(
					(downloadURL) => {
						setVideoUrl(downloadURL);
						void message.success('Upload successful!');
					},
				);
			},
		);
	};

	const uploadProps = {
		accept: 'video/*',
		customRequest: ({ file }: any) => handleUpload(file),
		showUploadList: false,
	};

	return (
		<div className='video-upload-container'>
			<Title level={2}>Upload Your Video</Title>
			<Upload {...uploadProps}>
				<Button icon={<UploadOutlined />} size='large' type='primary'>
					Upload Video
				</Button>
			</Upload>
			{uploadProgress > 0 && (
				<div className='progress-container'>
					<Progress percent={uploadProgress} status='active' />
					{/* <Lottie
						height={150}
						options={{
							animationData: uploadAnimationData,
							autoplay: true,
							loop: true,
						}}
						width={150}
					/> */}
				</div>
			)}
			{videoUrl && (
				<div className='video-preview'>
					<Button
						icon={<PlayCircleOutlined />}
						onClick={() => setModalVisible(true)}
						size='large'
						type='link'
					>
						View Video
					</Button>
					<Modal
						footer={null}
						onCancel={() => setModalVisible(false)}
						open={modalVisible}
						width='80%'
					>
						<video
							controls
							src={videoUrl}
							style={{ width: '100%' }}
						/>
					</Modal>
				</div>
			)}
		</div>
	);
};

export default VideoUpload;
