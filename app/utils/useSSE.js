import { useEffect } from 'react';

const SSE_ENDPOINT_URL = '/sse/server';

function useSSE(hash, onMessage) {
  useEffect(() => {
    const url = `${SSE_ENDPOINT_URL}?hash=${hash}`;
    let sse = null;

    const handlers = {
      handleMessage: e => {
        onMessage(JSON.parse(e.data));
      },
      handleError: e => {
        console.error(e);
        if (sse) {
          sse.close();
          sse = null;
        }
      },
    };

    const connect = () => {
      console.log('Connecting to SSE');
      sse = new EventSource(url, { withCredentials: false });
      sse.onmessage = handlers.handleMessage;
      sse.onerror = handlers.handleError;
    };

    handlers.handleError = e => {
      console.warn(`SSE Error, reconnecting in 1s`, e);
      if (sse) {
        sse.close();
        sse = null;
      }
      setTimeout(connect, 1000);
    };

    connect();

    return () => {
      if (sse) sse.close();
    };
  }, []);
}

export default useSSE;
