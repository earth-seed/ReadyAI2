import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const metric = JSON.parse(event.body || '{}');
    console.log('Performance metric:', metric);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process performance metric' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
