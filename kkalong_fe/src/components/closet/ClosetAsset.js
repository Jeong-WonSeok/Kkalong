import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.gltf");
  useFrame(() => (group.current.rotation.y += 0.01)); //이 곳!
  return (
    <group ref={group} {...props} dispose={null} scale={0.007}>
      <group position={[0, 0.02, 0]} rotation={[0, 1, Math.PI]}>
        <group rotation={[Math.PI / 30, 20, 0]}>
          <group
            position={[0, 100, -19.64]}
            rotation={[-Math.PI / 1, 0, 30]}
            scale={10.08}
          >
            <mesh
              geometry={nodes.KabzaSusPart2_KabzaSusPart2_0.geometry}
              material={materials.KabzaSusPart2}
            />
            <mesh
              geometry={nodes.KabzaSusPart2_MetalKilic_0.geometry}
              material={materials.MetalKilic}
            />
            <mesh
              geometry={nodes.KabzaSusPart2_KabzaSusPart5_0.geometry}
              material={materials.KabzaSusPart5}
            />
            <mesh
              geometry={nodes.KabzaSusPart2_KabzaSusPart4_0.geometry}
              material={materials.KabzaSusPart4}
            />
            <mesh
              geometry={nodes.KabzaSusPart2_KabzaSusPart3_0.geometry}
              material={materials.KabzaSusPart3}
            />
            <mesh
              geometry={nodes.KabzaSusPart2_KabzaSusPart1_0.geometry}
              material={materials.KabzaSusPart1}
            />
            <mesh
              geometry={nodes.KabzaSusPart2_Kabza_0.geometry}
              material={materials.Kabza}
            />
            <mesh
              geometry={nodes.KabzaSusPart2_EmiKilic_0.geometry}
              material={materials.EmiKilic}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

// import "./styles.css";
// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import Scene from "./closetasset/Scene";
// function ClosetAsset() {
//   let loader = new GLTFLoader();
//   return (
//     <>
//       <Canvas>
//         <OrbitControls autoRotate={true} />
//         <mesh>
//           <ambientLight intensity={1} />
//           <directionalLight position={[-1, 0, 1]} intensity={0.5} />
//           <boxGeometry args={[1, 1, 1]} />
//           <meshStandardMaterial attach="material" color={0xa3b18a} />
//         </mesh>
//       </Canvas>
//     </>
//   );
// }

// export default ClosetAsset;

// import React from "react";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

// import "./styles.css";
// import * as THREE from "three";
// export default function ClosetAsset() {
//   let scene = new THREE.Scene();
//   let renderer = new THREE.WebGLRenderer({
//     canvas: document.querySelector("sample-canvas"),
//   })();

//   let camera = new THREE.PerspectiveCamera(30, 1);
//   camera.position.set(0.)

//   let loader = new GLTFLoader();
//   loader.load("closetasset/scene.gltf", function (gltf) {
//     scene.add(gltf.scene);
//     renderer.render(scene, camera);
//   });

//   return (
//     <div>
//       <Canvas>
//         <OrbitControls autoRotate={true} />
//         <mesh>
//           <ambientLight intensity={1} />
//           <directionalLight position={(-1, 0, 1)} intensity={0.5} />
//           <boxGeometry args={[1, 1, 1]} />
//           <meshStandardMaterial attach="material" color={0xa3b18a} />
//         </mesh>
//       </Canvas>
//     </div>
//   );
// }
