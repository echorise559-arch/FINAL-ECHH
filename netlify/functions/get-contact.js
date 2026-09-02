// ── Netlify Function — contact / social links proxy ────────────────────────────
// Reads contact + social values from Netlify environment variables so they never
// have to be hardcoded in the client bundle. Set them in
// Netlify Dashboard → Site configuration → Environment variables:
//   WHATSAPP_NUMBER    e.g. 2348012345678        (required — same as before)
//   TELEGRAM_USERNAME  e.g. echorisemedia          (optional, no @ or URL needed)
//   TIKTOK_URL         e.g. https://tiktok.com/@echorisemedia   (optional)
//   INSTAGRAM_URL      e.g. https://instagram.com/echorisemedia (optional)

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

  // These are optional — the frontend simply hides the related button/link
  // if a value isn't set, so leaving them unconfigured never causes an error.
  const body = { whatsappNumber }
  if (process.env.TELEGRAM_USERNAME) body.telegramUsername = process.env.TELEGRAM_USERNAME.replace(/^@/, '').trim()
  if (process.env.TIKTOK_URL) body.tiktokUrl = process.env.TIKTOK_URL.trim()
  if (process.env.INSTAGRAM_URL) body.instagramUrl = process.env.INSTAGRAM_URL.trim()

  return {
    statusCode: 200,
    headers: { ...CORS, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}
