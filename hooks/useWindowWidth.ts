'use client';

import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  // always start with same value for SSR/client consistency
  const [windowWidth, setWindowWidth] = useState(1200);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // return default during SSR, actual width after mount
  return mounted ? windowWidth : 1200;
};

export default useWindowWidth;
