import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import styled from "styled-components";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.gltf");
  console.log(nodes);
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
}

const Scene = () => {
  return (
    <>
      <Contain>
        <Canvas>
          <Suspense fallback={null}>
            <directionalLight intensity={1} />
            <ambientLight intensity={1.2} />
            <spotLight
              intensity={2}
              angle={2}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <Model />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
          </Suspense>
        </Canvas>
      </Contain>
    </>
  );
};

export default Scene;

const Contain = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #eee;
`;
