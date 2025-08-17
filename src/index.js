import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Multer for handling file uploads
const upload = multer({ dest: "uploads/" });

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Root test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Caption route
app.post("/api/caption", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Read the uploaded file and convert to base64
    const imagePath = path.resolve(req.file.path);
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

    // Ask GPT-4o-mini (vision model) to caption the image
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Generate a short descriptive caption for this image.",
            },
            {
              type: "image_url",
              image_url: { url: base64Image }, // ✅ must be an object with url
            },
          ],
        },
      ],
    });

    // ✅ Extract caption safely (handles both array & string)
    let caption = "";
    const msgContent = response.choices[0].message.content;

    if (Array.isArray(msgContent)) {
      caption = msgContent
        .map((part) => (part.type === "text" ? part.text : ""))
        .join(" ");
    } else {
      caption = msgContent || "";
    }

    res.json({ caption });

    // Clean up temp file
    fs.unlinkSync(imagePath);
  } catch (err) {
    console.error("❌ Error generating caption:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate caption" });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
