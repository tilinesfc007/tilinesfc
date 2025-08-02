// api/counter.js
import { incrementCounter, getCount } from '../../lib/counter';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Incrementar contador
    const newCount = await incrementCounter();
    return res.status(200).json({ count: newCount });
  } else {
    // Obtener contador actual
    const count = await getCount();
    return res.status(200).json({ count });
  }
}