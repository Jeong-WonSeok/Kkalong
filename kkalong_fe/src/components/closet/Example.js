import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styled from "styled-components";

import Model from "./Model";

const Example = () => {
  return (
    <>
      <Contain>
        <Canvas>
          <Suspense fallback={null}>
            <directionalLight intensity={1} />
            <ambientLight intensity={1.2} />
            <spotLight
              intensity={0.1}
              angle={0.1}
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

export default Example;

const Contain = styled.div`
  width: 100%;
  height: 600px;
  margin: 0 auto;
  background: #2d2d2d;
`;
