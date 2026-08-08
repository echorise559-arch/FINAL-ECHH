// ── Netlify Function — WhatsApp number proxy ───────────────────────────────────
// Reads WHATSAPP_NUMBER from Netlify environment variables so the phone number
// never appears in the client bundle. Set it in Netlify Dashboard → Environment variables.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

export const handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' }
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  const whatsappNumber = process.env.WHATSAPP_NUMBER
  if (!whatsappNumber) {
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'WHATSAPP_NUMBER environment variable is not configured.' }),
    }
  }

  return {
    statusCode: 200,
    headers: { ...CORS, 'Content-Type': 'application/json' },
    body: JSON.stringify({ whatsappNumber }),
  }
}
