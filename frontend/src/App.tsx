import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setCaption("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      // ✅ Corrected backend URL to match deployed backend
      // Change this line inside handleSubmit
    const res = await axios.post(
      "https://ai-image-captioner-backend.onrender.com/api/caption", // ✅ correct route
       formData,
      { headers: { "Content-Type": "multipart/form-data" } }
);


      setCaption(res.data.caption);
    } catch (err) {
      console.error(err);
      setCaption("❌ Failed to fetch caption");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Image Captioner</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Get Caption"}
        </button>
      </form>
      {caption && <div className="caption">Caption: {caption}</div>}
    </div>
  );
}

export default App;
