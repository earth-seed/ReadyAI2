import { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  };
};
