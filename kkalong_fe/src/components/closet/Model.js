
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/scene.gltf')
  const { actions } = useAnimations(animations, group)

  useEffect(()=> {
    actions['Take 01'].play();
    // console.log(actions['Take 01']);
    // console.log(actions['Take 01'].repetitions);
    actions['Take 01'].repetitions = 1;
    
    actions['Take 01'].clampWhenFinished = true;
  })
    

  useFrame(() => {
    setTimeout(()=> {
      group.current.position.z += 0.02;
    },2500)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Root">
            <group name="Cube002" position={[0.8, 1.44, 2.33]} scale={[0.07, 0.68, 2.49]}>
              <mesh name="Cube002_0" geometry={nodes.Cube002_0.geometry} material={materials.Root} />
            </group>
            <group name="Cube003" position={[0.81, -1.46, 2.33]} scale={[0.07, 0.68, 2.49]}>
              <mesh name="Cube001_0" geometry={nodes.Cube001_0.geometry} material={materials.Root} />
            </group>
            <group name="Cube001" position={[0, 0, 2.71]} scale={[0.79, 1.61, 2.61]}>
              <mesh name="Cube_0" geometry={nodes.Cube_0.geometry} material={materials['Material.001']} />
            </group>
            <group name="Cube005" position={[0.04, -0.04, -0.13]} rotation={[0, 0, 1.56]} scale={[0.28, 0.68, 0.26]}>
              <mesh name="Cube005_0" geometry={nodes.Cube005_0.geometry} material={materials.Root} />
            </group>
            <group name="Cube007" position={[0.66, -0.06, 5.48]} rotation={[-Math.PI, 0, 0]} scale={[0.28, 1.38, 0.26]}>
              <mesh name="Cube007_0" geometry={nodes.Cube007_0.geometry} material={materials.Root} />
            </group>
            <group name="Cube008" position={[-0.05, -0.01, 0.62]} scale={[0.58, 1.52, 0.05]}>
              <mesh name="Cube008_0" geometry={nodes.Cube008_0.geometry} material={materials.Root} />
            </group>
            <group name="Cylinder" position={[0.32, 0, 4.35]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.03, 0.03, 1.51]}>
              <mesh name="Cylinder_0" geometry={nodes.Cylinder_0.geometry} material={materials.Root} />
            </group>
            <group name="Lamp" position={[4.08, 1.01, 5.9]} rotation={[-0.27, 0.6, 1.93]}>
              <group name="Lamp001" />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default Model;
