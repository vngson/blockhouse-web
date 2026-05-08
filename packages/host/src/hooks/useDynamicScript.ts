import { useEffect, useState } from 'react';

interface UseDynamicScriptResult {
  ready: boolean;
  failed: boolean;
}

/**
 * Dynamically loads a script by injecting a <script> tag into the document head.
 * Tracks ready/failed state for conditional rendering.
 */
export function useDynamicScript(url: string): UseDynamicScriptResult {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!url) return;

    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) {
      setReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => setReady(true);
    script.onerror = () => {
      console.error(`Dynamic script failed to load: ${url}`);
      setFailed(true);
    };

    document.head.appendChild(script);
  }, [url]);

  return { ready, failed };
}
