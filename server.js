// server.js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const FormData = require("form-data");
const fetch = require("node-fetch"); // v2 (CommonJS)
const cors = require("cors");
const path = require("path");

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

app.use(cors()); // not strictly needed since we serve index.html from same origin
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/parse", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Build multipart/form-data for Affinda upload
    const form = new FormData();
    form.append("file", req.file.buffer, { filename: req.file.originalname });
    // If you use workspaces:
    form.append("workspace", "nRcssZss");

    // 1) Upload the document to Affinda
    const up = await fetch("https://api.affinda.com/v3/documents", {
      method: "POST",
      headers: {
        Authorization: `Bearer aff_42695a8e02df493a11ee8de4a9613eb6a0c6c21d`,
        ...form.getHeaders(),
      },
      body: form,
    });

    if (!up.ok) {
      const text = await up.text();
      return res.status(up.status).json({ error: "Upload failed", details: text });
    }

    const upJson = await up.json();
    const id = upJson?.meta?.identifier;
    if (!id) return res.status(500).json({ error: "No document identifier returned" });

    // 2) Poll until parsing is ready (simple demo loop)
    let doc = null;
    for (let i = 0; i < 20; i++) { // ~16 seconds max (20 * 800ms)
      const r = await fetch(`https://api.affinda.com/v3/documents/${id}`, {
        headers: { Authorization: `Bearer aff_42695a8e02df493a11ee8de4a9613eb6a0c6c21d` },
      });
      if (!r.ok) {
        const t = await r.text();
        return res.status(r.status).json({ error: "Fetch failed", details: t });
      }
      doc = await r.json();
      const ready = doc?.meta?.ready;
      const failed = doc?.meta?.failed;
      if (ready && !failed) break;
      await new Promise((s) => setTimeout(s, 800));
    }

    if (!doc?.meta?.ready) {
      return res.status(202).json({ error: "Parsing not ready yet, try again" });
    }
    if (doc?.meta?.failed) {
      return res.status(500).json({ error: "Parsing failed", details: doc?.meta });
    }

    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unexpected server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
