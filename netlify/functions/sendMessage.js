import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { name, phone, message } = JSON.parse(event.body);

    const text = `🚀 **Yangi xabar!**\n\n👤 **Ism:** ${name}\n📞 **Telefon:** ${phone}\n💬 **Xabar:** ${message}`;

    const TELEGRAM_BOT_TOKEN = "8514142968:AAEj82ZobPep9_CVKG3jFrPfgWGZGvUSt2g";
    const TELEGRAM_CHAT_ID = "-1003848661157";

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      }
    );

    const data = await res.json();

    if (data.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: data.description }),
      };
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: err.message }) };
  }
}