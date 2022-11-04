import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Model = ({ ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, -0.27, 0]}>
            <mesh
              geometry={nodes.armario_phongE1_0.geometry}
              material={materials.phongE1}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default Model;
