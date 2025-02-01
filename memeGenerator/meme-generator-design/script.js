// Array of random meme images
const memeImages = [
	"https://i.imgflip.com/1bij.jpg", // Distracted Boyfriend
	"https://i.imgflip.com/1g8my4.jpg", // Two Buttons
	"https://i.imgflip.com/1ur9b0.jpg", // Drake Hotline Bling
	"https://i.imgflip.com/30b1gx.jpg", // Change My Mind
	"https://i.imgflip.com/1h7in3.jpg", // Blinking Guy
  ];

  // DOM Elements
  const topTextInput = document.getElementById("top-text");
  const bottomTextInput = document.getElementById("bottom-text");
  const generateBtn = document.getElementById("generate-btn");
  const memeImage = document.getElementById("meme-image");
  const topTextOverlay = document.getElementById("top-text-overlay");
  const bottomTextOverlay = document.getElementById("bottom-text-overlay");

  // Generate Meme Function
  function generateMeme() {
	// Get random image from the array
	const randomImage = memeImages[Math.floor(Math.random() * memeImages.length)];
	memeImage.src = randomImage;

	// Update text overlays
	topTextOverlay.textContent = topTextInput.value;
	bottomTextOverlay.textContent = bottomTextInput.value;
  }

  // Event Listener for Generate Button
  generateBtn.addEventListener("click", generateMeme);

  // Initial Meme Generation on Load
  generateMeme();