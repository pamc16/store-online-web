import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useInView } from 'react-intersection-observer';

interface LazyLoadImageProps {
	imageUrl: string;
	index: number;
    description: string
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({ imageUrl, index, description }) => {
	const [ref, inView] = useInView({
		triggerOnce: true, // Solo activar una vez
		threshold: 0.5, // Umbral de visibilidad
	});

	return (
		<div ref={ref}>
			{inView ? (
				<Card
					hoverable
					cover={<img alt={`Imagen ${index}`} src={imageUrl} />}
					style={{ marginBottom: '16px' }}
				>
					<Card.Meta
						title={`Imagen ${index + 1}`}
						description={description}
					/>
				</Card>
			) : (
				<Card
					hoverable
					style={{
						marginBottom: '16px',
						minHeight: '200px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<LoadingOutlined style={{ fontSize: '24px' }} />
				</Card>
			)}
		</div>
	);
};

export default LazyLoadImage;
