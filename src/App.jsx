import React, { useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Frame from '../Frame';
import nuit from './assets/nuit_etoilee.webp';  // Image à utiliser comme texture

function App() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={10} />
        <Frame textureURL={nuit} /> {/* Passez l'URL de l'image ici */}
      </Canvas>
    </>
  );
}

export default App;
