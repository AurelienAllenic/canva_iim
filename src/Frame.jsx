import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Frame({ textureURL, ...props }) {
  const { nodes, materials } = useGLTF('/frame.glb');
  
  const texture = useTexture(textureURL);  // Charge la texture à partir de l'URL donnée

  // Ajuste les dimensions de la texture
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;  // Permet la répétition si la texture est plus petite que la surface
  texture.repeat.set(1, 1);  // Répétition de la texture sur les axes X et Y (ajuster les valeurs selon les besoins)

  // Applique une rotation si nécessaire
  texture.rotation = Math.PI / 2;

  return (
    <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]}> {/* Rotation de -90° autour de l'axe Y */}
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} scale={[0.087, 1.358, 1.358]} />
      
      {/* Le plan qui reçoit la texture */}
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} position={[0.004, 0.012, -0.008]} rotation={[0, 0, -Math.PI / 2]}>
        <meshStandardMaterial attach="material" map={texture} />  {/* Applique le matériau avec la texture */}
      </mesh>
    </group>
  );
}

useGLTF.preload('/frame.glb');
