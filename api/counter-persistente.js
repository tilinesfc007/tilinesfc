import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  // Configura tu instancia KV de Vercel
  const kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  if (req.method === 'POST') {
    const newCount = await kv.incr('downloads');
    return res.json({ count: newCount });
  } else {
    const count = await kv.get('downloads') || 0;
    return res.json({ count });
  }
}
