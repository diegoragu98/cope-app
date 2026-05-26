'use client';

import { useEffect } from 'react';

export default function PWAInstaller() {
  useEffect(() => {
    // Registrar service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }

    // Detectar si está en modo PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA is being used in standalone mode');
    }
  }, []);

  return null;
}
