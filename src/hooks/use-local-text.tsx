// src/hooks/useLocalTexts.tsx
import { useState, useEffect } from 'react';
import { useConfigFile } from './use-config-file';

export const useLocalTexts = () => {
  const [texts, setTexts] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const configFile = useConfigFile();

  useEffect(() => {
    if (!configFile) return;

    const fetchTexts = async () => {
      try {
        const response = await fetch(`/config/${configFile}.json`);
        const data = await response.json();
        setTexts(data);
      } catch (error) {
        console.error('Error fetching texts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTexts();
  }, [configFile]);

  return { texts, loading };
};

export default useLocalTexts;
