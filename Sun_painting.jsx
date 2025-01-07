import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'; // Correct importation de useLoader
import { TextureLoader } from 'three';

export function Model({ textureURL, ...props }) {
  // Chargez le modèle GLB
  const { nodes, materials } = useGLTF('./frame.glb');
  
  // Chargez la texture à partir de l'URL fournie
  const texture = useLoader(TextureLoader, textureURL);

  // Modifiez la géométrie pour appliquer la texture à l'intérieur du cadre
  return (
    <group {...props} dispose={null} scale={5}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={6.683}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          {/* Appliquez la texture à un plan (ou une géométrie interne) du cadre */}
          <mesh
            geometry={nodes.Plano001_Materiais003_0.geometry} // Cela peut être un autre plan à l'intérieur du cadre
            material={materials['Materiais.003']}
            position={[0, 0, 0]} // Position à l'intérieur du cadre (modifiez selon le besoin)
            scale={1} // Ajustez la taille du plan pour l'adapter à l'intérieur du cadre
          >
            {/* Appliquez la texture au matériau */}
            <meshStandardMaterial attach="material" map={texture} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/sun_painting.glb');

export default Model;
