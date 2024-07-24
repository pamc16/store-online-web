import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { setPreviewImage, setPreviewVisible } from 'app/page/premium/slice/premium.slice';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';

interface LazyLoadImageProps {
	description: string;
	imageUrl: string;
	index: number;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({
	description,
	imageUrl,
	index,
}) => {
	const [ref, inView] = useInView({
		threshold: 0.5, // umbral de visibilidad
		triggerOnce: true, // solo activar una vez
	});
	const dispatch = useDispatch();


	const handlePreview = async (event: any) => {
		console.log(event.target.src);
		dispatch(setPreviewImage(event.target.src));
		dispatch(setPreviewVisible(true));
	  };

	return (
		<div ref={ref}>
			{inView ? (
				<Card
					cover={<img alt={`Imagen ${index}`} src={imageUrl} />}
					hoverable
					style={{ marginBottom: '16px' }}
					onClick={(event) => handlePreview(event)}
				>
					<Card.Meta
						description={description}
						title={`Imagen ${index + 1}`}
					/>
				</Card>
			) : (
				<Card
					hoverable
					style={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '16px',
						minHeight: '200px',
					}}
				>
					<LoadingOutlined style={{ fontSize: '24px' }} />
				</Card>
			)}
		</div>
	);
};

export default LazyLoadImage;
