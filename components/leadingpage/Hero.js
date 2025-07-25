'use client';
import { useEffect, useRef } from 'react';

export default function Hero360() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleFrameLoad = () => {
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage('hideControls', '*');
      }
    };

    iframe?.addEventListener('load', handleFrameLoad);

    return () => {
      iframe?.removeEventListener('load', handleFrameLoad);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        ref={iframeRef}
        src="/360/index.html"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        allowFullScreen
      />
    </div>
  );
}
