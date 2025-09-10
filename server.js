// server.js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// POST /api/parse -> RChilli parseResumeBinary
app.post("/api/parse", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const base64 = req.file.buffer.toString("base64");

    const payload = {
      filedata: base64,
      filename: req.file.originalname,
      userkey: "Q2V6H6L9",
      version: "8.0.0",
      subuserid: "Naveen Yadav",
    };

    // RChilli binary endpoint (JSON)
    const url = `https://rest.rchilli.com/RChilliParser/Rchilli/parseResumeBinary`; // Content-Type: application/json
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await r.text(); // in case of non-JSON error payloads
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!r.ok) {
      return res.status(r.status).json({ error: "RChilli error", details: data });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unexpected server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
