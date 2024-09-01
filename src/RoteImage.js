import {React, useState} from "react"
import GameState from "./components/GameState";


const RoteImage = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);

  };

  return(
    <>
    <input type="file" onChange={handleImageChange} />
      <div
        style={{
          backgroundPosition: "center",
          width: "99%",
          height: "800px",
          backgroundImage: selectedImage ? `url(${selectedImage})` : "none",
          backgroundSize: "cover",
          position: "absolute",
          zIndex: -1
        }}
      >
      <GameState/>
      </div>
    </>
  )
}

export default RoteImage