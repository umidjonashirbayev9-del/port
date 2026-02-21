// netlify/functions/sendMessage.js
export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
   const TELEGRAM_BOT_TOKEN = "8514142968:AAEj82ZobPep9_CVKG3jFrPfgWGZGvUSt2g";
    const TELEGRAM_CHAT_ID = "-1003848661157";
  try {
    const { name, phone, message } = JSON.parse(event.body);

    const text = `🚀 New message!\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;

    // Global fetch ishlatiladi, node-fetch kerak emas
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });

    const data = await res.json();

    if (!data.ok) throw new Error(data.description);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}