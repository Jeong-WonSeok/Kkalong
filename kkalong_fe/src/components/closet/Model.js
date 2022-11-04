import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Model = ({ ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null} scale={0.03}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials["9smg1"]} />
        <mesh geometry={nodes.Object_3.geometry} material={materials["9smg2"]} />
      </group>
    </group>
  );
};

export default Model;
