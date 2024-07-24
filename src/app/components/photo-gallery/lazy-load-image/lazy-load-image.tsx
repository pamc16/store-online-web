import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useInView } from 'react-intersection-observer';

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

	return (
		<div ref={ref}>
			{inView ? (
				<Card
					cover={<img alt={`Imagen ${index}`} src={imageUrl} />}
					hoverable
					style={{ marginBottom: '16px' }}
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
