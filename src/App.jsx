import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Frame from './Frame';
import * as THREE from 'three';

const App = () => {
  const [textureURL, setTextureURL] = useState('');

  useEffect(() => {
    // Créer une texture sur un canvas (par exemple, Van Gogh Night Sky)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 512;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#4CC9F0");
    gradient.addColorStop(0.5, "#4361EE");
    gradient.addColorStop(1, "#7209B7");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Création de la texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Crée une URL temporaire à partir de la texture
    const textureURL = canvas.toDataURL();

    // Met à jour l'URL de la texture
    setTextureURL(textureURL);
  }, []);

  return (
    <Canvas>
      <OrbitControls />
      {/* Lumières très fortes et blanches */}
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="white" />
      <ambientLight intensity={1.0} color="white" />
      <pointLight position={[0, 5, 0]} intensity={2.0} color="white" />
      {textureURL && <Frame textureURL={textureURL} />}
    </Canvas>
  );
};

export default App;
