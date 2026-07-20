export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { passcode } = await req.json();

  if (passcode !== process.env.JOURNAL_PASSCODE) {
    return new Response(JSON.stringify({ error: 'Feil passord.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config = { path: '/api/journal-login' };
