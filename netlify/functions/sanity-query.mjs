export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { query } = await req.json();
  if (!query) {
    return new Response(JSON.stringify({ error: 'Missing query' }), { status: 400 });
  }

  const url = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${process.env.SANITY_DATASET}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` },
  });
  const json = await res.json();

  return new Response(JSON.stringify(json.result), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config = { path: '/api/sanity-query' };
