import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function DynamicCanvas() {
  const { scene } = useGLTF("/sun_painting.glb");
  const textureRef = useRef();

  // Crée une texture dynamique
  const dynamicTexture = new THREE.CanvasTexture(document.createElement("canvas"));
  const ctx = dynamicTexture.image.getContext("2d");

  // Taille de la texture
  const width = 512;
  const height = 512;
  dynamicTexture.image.width = width;
  dynamicTexture.image.height = height;

  // Dessine quelque chose sur la texture
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "black";
  ctx.font = "40px Arial";
  ctx.fillText("Dynamique", 100, 100);

  dynamicTexture.needsUpdate = true;

  // Anime la texture
  useFrame(() => {
    const time = performance.now() * 0.001;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = `hsl(${(time * 40) % 360}, 50%, 50%)`;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Dynamique", 100, 100);
    dynamicTexture.needsUpdate = true;
  });

  // Applique la texture à la toile du modèle
  const canvasMesh = scene.getObjectByName("Canvas"); // Remplacez par le nom correct
  if (canvasMesh) {
    canvasMesh.material.map = dynamicTexture;
    canvasMesh.material.needsUpdate = true;
  }

  return <primitive object={scene} />;
}

export default DynamicCanvas;
