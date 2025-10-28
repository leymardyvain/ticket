import React, { useRef, useState, useEffect } from 'react';

function AffichageFichier({ src }) {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState('auto');
  const [iframeWidth, setIframeWidth] = useState('auto');

  const handleLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const contentDoc = iframeRef.current.contentWindow.document;
      setIframeHeight(contentDoc.body.scrollHeight + 'px');
      setIframeWidth(contentDoc.body.scrollWidth + 'px');
    }
  };

  useEffect(() => {
    // You might also want to re-evaluate size if content changes within the iframe
    // using a MutationObserver inside the iframe content, and sending messages.
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      onLoad={handleLoad}
      style={{ height: iframeHeight, width: iframeWidth, border: 'none' }}
    />
  );
}

export default AffichageFichier;