// src/hooks/useTexts.tsx
import { useState, useEffect } from 'react';
import { store } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const useTexts = (nameCollection: string) => {
	const [texts, setTexts] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState(true);
	// const configFile = useConfigFile();

	useEffect(() => {
		const fetchTexts = async () => {
			try {
				const querySnapshot = await getDocs(
					collection(store, nameCollection),
				);
				const textsData: { [key: string]: any } = {};
				querySnapshot.forEach((doc: any) => {
					textsData[doc.id] = doc.data();
				});

				setTexts(textsData);
			} catch (error) {
				console.error('Error fetching texts:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchTexts();
	}, []);

	return { texts, loading };
};

export default useTexts;
