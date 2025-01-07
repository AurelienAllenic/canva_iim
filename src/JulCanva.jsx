import React, { useEffect, useRef } from "react";
import * as THREE from 'three';

const VanGoghNightSky = ({ setTexture }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Dimensions du canvas
    const width = canvas.width;
    const height = canvas.height;

    // === 1. Dégradé pour le fond ===
    const gradient = ctx.createLinearGradient(0, 0, 0, height); // Du haut vers le bas
    gradient.addColorStop(0, "#4CC9F0"); // Couleur claire en haut
    gradient.addColorStop(0.5, "#4361EE");
    gradient.addColorStop(1, "#7209B7"); // Couleur sombre en bas
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height); // Applique le fond de couleur

    // === 2. Fonction pour dessiner des traits sans espace ===
    const drawDenseCurvedLines = (x, y, length, angle, color) => {
      const curveFactor = Math.random() * 0.1 + 0.05; // Courbure plus prononcée

      ctx.beginPath();
      ctx.moveTo(x, y);

      // Dessiner une ligne droite avec une courbure légère mais continue
      for (let i = 0; i < length; i++) {
        const offsetX = Math.sin(angle + i * curveFactor) * i;
        const offsetY = Math.cos(angle + i * curveFactor) * i;
        ctx.lineTo(x + offsetX, y + offsetY);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = Math.random() * 2 + 1; // Variation de la largeur des lignes pour plus de diversité
      ctx.lineCap = "round"; // Rendre les bords des lignes plus arrondis
      ctx.stroke();
    };

    // === 3. Dessiner plusieurs lignes continues et denses ===
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = Math.random() * 100 + 50; // Longueur variable des traits
      const angle = Math.random() * Math.PI * 2; // Angle aléatoire pour chaque trait
      const color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Couleur dynamique pour chaque trait

      drawDenseCurvedLines(x, y, length, angle, color);
    }

    // Créer la texture à partir du canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true; // Indiquer que la texture doit être mise à jour
    setTexture(texture); // Passer la texture au parent
    console.log(texture, "texture");

    // Nettoyage (optionnel)
    return () => {
      ctx.clearRect(0, 0, width, height);
    };
  }, [setTexture]);

  return (
    <canvas
      ref={canvasRef}
      width={3000}
      height={3000}
      style={{ display: "none" }}
    />
  );
};

export default VanGoghNightSky;
