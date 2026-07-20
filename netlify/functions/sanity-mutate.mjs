export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { mutations } = await req.json();
  if (!mutations) {
    return new Response(JSON.stringify({ error: 'Missing mutations' }), { status: 400 });
  }

  const url = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${process.env.SANITY_DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });

  return new Response(JSON.stringify({ ok: res.ok }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config = { path: '/api/sanity-mutate' };
