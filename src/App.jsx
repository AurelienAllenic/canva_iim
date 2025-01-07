import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Frame from './Frame';
import nuit from './assets/nuit_etoilee.webp';
import amandiers from './assets/amandiers.jpeg'
import autoportrait from './assets/autoportrait.jpeg'
import champs from './assets/champs.jpeg'
import { FiRefreshCw } from "react-icons/fi";

// Composant principal
const App = () => {
  const [textureURL, setTextureURL] = useState(nuit); // Texture par défaut

  // Fonction pour changer la texture
  const handleChangeTexture = (url) => {
    setTextureURL(url);
  };

  return (
    <>
      {/* Canvas 3D */}
      <Canvas>
        <OrbitControls minDistance={3} maxDistance={4} /> 
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="white" />
        <ambientLight intensity={3.0} color="white" />
        <pointLight position={[0, 5, 0]} intensity={2.0} color="white" />
        {textureURL && <Frame textureURL={textureURL} />}
      </Canvas>

      {/* Conteneur des boutons */}
      <div className="container-btn">
        <button onClick={() => handleChangeTexture(nuit)}>La nuit étoilée</button>
        <button onClick={() => handleChangeTexture(amandiers)}>Amandier en fleurs</button>
        <button onClick={() => handleChangeTexture(autoportrait)}>Autoportrait</button>
        <button onClick={() => handleChangeTexture(champs)}>Champ de blé aux corbeaux</button>
      </div>
    </>
  );
};

export default App;
