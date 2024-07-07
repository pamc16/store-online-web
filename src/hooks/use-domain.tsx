// src/hooks/useDomain.tsx
import { useEffect, useState } from 'react';

export const useDomain = () => {
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    setDomain(window.location.hostname);
  }, []);

  return domain;
};
