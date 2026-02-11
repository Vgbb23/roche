import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apenas POST é permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const apiToken = process.env.FRUITFY_API_TOKEN;
  const storeId = process.env.FRUITFY_STORE_ID;

  if (!apiToken || !storeId) {
    return res.status(500).json({ success: false, message: 'Credenciais da API não configuradas' });
  }

  try {
    const response = await fetch('https://api.fruitfy.io/api/pix/charge', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Store-Id': storeId,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    console.error('Erro ao chamar API Fruitfy:', error);
    return res.status(500).json({ success: false, message: 'Erro ao comunicar com a API de pagamento' });
  }
}
