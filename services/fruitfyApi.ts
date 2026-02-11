
export interface FruitfyChargePayload {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  items: {
    id: string;
    value: number;
    quantity: number;
  }[];
}

export interface FruitfyPixResponse {
  success: boolean;
  message?: string;
  data?: {
    order_id?: string;
    status?: string;
    amount?: number;
    pix?: {
      code?: string;
      expires_at?: string;
      qr_code_base64?: string;
    };
    [key: string]: any;
  };
  errors?: Record<string, string[]>;
}

/**
 * Cria uma cobrança PIX via API Fruitfy.
 * As chamadas passam pelo proxy do Vite que injeta os headers de autenticação.
 * 
 * A API pode responder em dois formatos:
 * 1. Com wrapper: { success: true, data: { order_id, pix: {...} } }
 * 2. Direto: { order_id, status, amount, pix: { code, qr_code_base64 } }
 */
export async function createPixCharge(payload: FruitfyChargePayload): Promise<FruitfyPixResponse> {
  const response = await fetch('/api/fruitfy/pix/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.json();

  if (!response.ok) {
    const errorMsg = raw.message || `Erro HTTP ${response.status}`;
    throw new Error(errorMsg);
  }

  // Normalizar resposta: se vier com wrapper { success, data }, usa; senão, trata o JSON raiz como data
  if (raw.success !== undefined) {
    // Formato com wrapper
    if (!raw.success) {
      throw new Error(raw.message || 'Erro ao criar cobrança PIX');
    }
    return raw as FruitfyPixResponse;
  }

  // Formato direto (sem wrapper) — os dados do PIX estão no nível raiz
  return {
    success: true,
    data: raw,
  };
}

/**
 * Extrai os dados do QR Code PIX da resposta da API Fruitfy.
 * 
 * Estrutura real da resposta:
 * {
 *   order_id: "...",
 *   status: "waiting_payment",
 *   amount: 11141,
 *   pix: {
 *     code: "00020101...",         // Código copia-e-cola do PIX
 *     expires_at: "...",
 *     qr_code_base64: "data:image/svg+xml;base64,..."  // QR Code em SVG base64
 *   }
 * }
 */
export function extractPixData(data: Record<string, any>): { qrcode: string; qrcode_text: string } {
  let qrcode = '';
  let qrcode_text = '';

  // Estrutura principal: dados dentro do objeto "pix"
  const pix = data.pix;
  if (pix && typeof pix === 'object') {
    // QR Code base64 (SVG ou PNG)
    if (pix.qr_code_base64) {
      qrcode = pix.qr_code_base64;
    }
    // Código copia-e-cola
    if (pix.code) {
      qrcode_text = pix.code;
    }
  }

  // Fallback: procurar campos no nível raiz (caso a API mude)
  if (!qrcode) {
    const imageFields = ['qr_code_base64', 'qr_code', 'qrcode', 'qr_code_url'];
    for (const field of imageFields) {
      if (data[field]) {
        qrcode = data[field];
        break;
      }
    }
  }

  if (!qrcode_text) {
    const textFields = ['code', 'qr_code_text', 'pix_code', 'copy_paste', 'brcode', 'emv'];
    for (const field of textFields) {
      if (data[field] && typeof data[field] === 'string') {
        qrcode_text = data[field];
        break;
      }
    }
  }

  // Se for base64 sem prefixo data:, adicionar
  if (qrcode && !qrcode.startsWith('http') && !qrcode.startsWith('data:')) {
    qrcode = `data:image/png;base64,${qrcode}`;
  }

  // Fallback final: se não tiver imagem mas tiver código texto, gerar QR via API pública
  if (!qrcode && qrcode_text) {
    qrcode = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrcode_text)}`;
  }

  return { qrcode, qrcode_text };
}
