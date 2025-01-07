/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 .\public\psx_painting.glb 
Author: Brainsick Games (https://sketchfab.com/BrainsickGames)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/psx-painting-eb869f2272334150977ca9d9b89fc986
Title: psx painting
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/psx_painting.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-1.571, 0, Math.PI / 2]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Object_6.geometry} material={materials.material_0} />
          <mesh geometry={nodes.Object_8.geometry} material={materials.material_1} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/psx_painting.glb')