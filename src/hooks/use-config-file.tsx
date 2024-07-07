/* eslint-disable react-hooks/rules-of-hooks */
// src/hooks/useConfigFile.tsx
import { useEffect, useState } from 'react';
import { useDomain } from './use-domain';

export const useConfigFile = () => {
  const [configFile, setConfigFile] = useState<string>('');

    const domain = useDomain();
    const environment = process.env.NODE_ENV;

    // if (environment === 'development') {
    //   configFile = 'development';
    // } else if (environment === 'production') {
    //   if (domain === 'example.com') {
    //     configFile = 'production_example';
    //   } else if (domain === 'anotherdomain.com') {
    //     configFile = 'production_anotherdomain';
    //   }
    // }

    setConfigFile('andrii-page');

  return configFile;
};
