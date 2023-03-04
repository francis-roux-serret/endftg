import { useEffect } from 'react';

const SSE_ENDPOINT_URL = '/sse/server';

function useSSE(hash, onMessage, onError = null) {
  useEffect(() => {
    const url = `${SSE_ENDPOINT_URL}?hash=${hash}`;
    const sse = new EventSource(url, { withCredentials: false });

    sse.onmessage = e => onMessage(JSON.parse(e.data));

    sse.onerror = e => {
      // error log here
      console.error(`SSE Error`, e);
      if (onError) {
        onError(e);
      }
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);
}

export default useSSE;
