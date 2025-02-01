import { useState, useEffect } from "react";
import "./App.css";
import { Download, ImagePlus } from "lucide-react";
import html2canvas from "html2canvas";

const MEME_URL = "https://api.imgflip.com/get_memes"

function App() {
  const [memeData, setMemeData] = useState({
    topText: "One does not simply",
    bottomText: "Walk on the mirror",
    imgUrl: "https://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes ] = useState([])
  useEffect(() => {
    fetch(MEME_URL)
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
    .catch(err => console.log(err))

  }, [])

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * 101)
    const randomImage = allMemes[randomIndex]
    setMemeData(pre => {
      return {
        ...pre,
        imgUrl: randomImage.url
      }
    })

  }




  const downloadMeme = () => {
    const memeElement = document.querySelector(".meme-display");
    html2canvas(memeElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "meme.png";
      link.click();
    });
  };
  const handleInputText = (e) => {
    const { value, name } = e.currentTarget;
    setMemeData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <div className="container">
      <header>
        <div className="header-content">
          <img
            src="../public/meme-generator.webp"
            alt="Meme Icon"
            className="icon"
          />
          <h1>Meme Generator</h1>
        </div>
      </header>

      <div className="input-fields">
        <input
          type="text"
          placeholder="Enter top text..."
          className="text-input"
          value={memeData.topText}
          name="topText"
          onChange={(e) => handleInputText(e)}
        />
        <input
          type="text"
          placeholder="Enter bottom text..."
          className="text-input"
          value={memeData.bottomText}
          name="bottomText"
          onChange={(e) => handleInputText(e)}
        />
      </div>

      <div onClick={getRandomImage} className="buttons">
        <button id="generate-btn">
          Generate a new meme image
          <ImagePlus size={13} />
        </button>
        <button id="download-btn" onClick={downloadMeme}>
          <Download size={18} /> Download Meme
        </button>
      </div>

      <div className="meme-display">
        <>
          <img id="meme-image" src={memeData.imgUrl} alt="Meme" />
          <div className="meme-text top-text">{memeData.topText}</div>
          <div className="meme-text bottom-text">{memeData.bottomText}</div>
        </>
      </div>
    </div>
  );
}

export default App;
