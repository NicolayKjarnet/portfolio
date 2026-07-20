import { createHmac } from 'crypto';

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { token } = await req.json();
  const expected = createHmac('sha256', process.env.JOURNAL_PASSCODE)
    .update('portfolio-auth')
    .digest('hex');

  if (token === expected) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'invalid' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config = { path: '/api/verify-auth' };
