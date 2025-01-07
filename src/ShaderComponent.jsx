import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial } from 'three';
import * as THREE from 'three';

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 iResolution;
  uniform float iTime;

  void main() {
    vec2 p = gl_FragCoord.xy / iResolution.xy;
    vec3 color = 0.5 + 0.5 * cos(iTime + p.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(color, 1.0);
  }
`;

const ShaderComponent = () => {
  const [resolution, setResolution] = useState(new THREE.Vector3(1, 1, 1));

  useEffect(() => {
    // Mettre à jour la résolution après le montage du composant
    setResolution(new THREE.Vector3(window.innerWidth, window.innerHeight, 1));
  }, []);

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      iResolution: { value: resolution },
      iTime: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  });

  useFrame(({ clock }) => {
    shaderMaterial.uniforms.iTime.value = clock.elapsedTime;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial attach="material" args={[shaderMaterial]} />
    </mesh>
  );
};

export default ShaderComponent;
