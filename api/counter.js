// api/counter.js
let count = 0;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Incrementar contador
    count += 1;
    console.log('Nuevo contador:', count); // Para depuración
    return res.status(200).json({ count });
  } else {
    // Obtener contador actual
    console.log('Contador actual:', count); // Para depuración
    return res.status(200).json({ count });
  }
}
