const imageInput = document.getElementById("imageInput");
const generateBtn = document.getElementById("generateBtn");
const captionEl = document.getElementById("caption");
const imagePreview = document.getElementById("imagePreview");
const loader = document.getElementById("loader");

// Show image preview
imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.src = event.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Handle generate caption
generateBtn.addEventListener("click", async () => {
  if (!imageInput.files.length) {
    alert("Please select an image!");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageInput.files[0]);

  captionEl.textContent = "Generating caption...";
  generateBtn.disabled = true;
  loader.style.display = "block";

  try {
    // ✅ Corrected backend URL to match deployed backend
    // Change this line inside generateBtn click handler
const res = await fetch(
  "https://ai-image-captioner-backend.onrender.com/api/caption", // ✅ correct route
  { method: "POST", body: formData }
);


    const data = await res.json();
    captionEl.textContent = data.caption || "No caption returned";
  } catch (error) {
    captionEl.textContent = "Error: " + error.message;
    console.error(error);
  } finally {
    generateBtn.disabled = false;
    loader.style.display = "none";
  }
});
