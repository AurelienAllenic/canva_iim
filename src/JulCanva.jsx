import React, { useEffect } from 'react';
import * as THREE from 'three'; 
import { useThree } from '@react-three/fiber';

const VanGoghNightSky = ({ setTexture }) => {
  const { gl, scene } = useThree();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 3000;
    const height = 3000;
    canvas.width = width;
    canvas.height = height;
    console.log(typeof setTexture);
    
    // Création du dégradé et dessin sur le canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#4CC9F0");
    gradient.addColorStop(0.5, "#4361EE");
    gradient.addColorStop(1, "#7209B7");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Dessiner des traits courbés
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = Math.random() * 100 + 50;
      const angle = Math.random() * Math.PI * 2;
      const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
      drawDenseCurvedLines(ctx, x, y, length, angle, color);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    setTexture(texture); // Assurez-vous que texture est bien définie ici

  }, [setTexture]);

  // Fonction de dessin des lignes courbes
  const drawDenseCurvedLines = (ctx, x, y, length, angle, color) => {
    ctx.beginPath();
    ctx.moveTo(x, y);  // Point de départ
    ctx.arc(x, y, length, angle, angle + Math.PI);  // Dessine un arc (courbe)
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;  // Ajuste l'épaisseur des lignes selon tes besoins
    ctx.stroke();
  };

  return null; // Pas de rendu ici
};

export default VanGoghNightSky;
