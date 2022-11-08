import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import styled from "styled-components";
import Model from "./Model";
import { useNavigate } from "react-router-dom";

const Example = () => {
  const navigate = useNavigate();

  const updateHandler = (e) => {
    console.log("업뎃핸들러");
    setTimeout(() => {
      setTimeout(() => {
        navigate("/VirtualFitting/VirtualBrandChoice/");
      }, 2500);
      for (let i = 0; i < 110; i++) {
        setTimeout(() => {
          e.scale.z += i * 0.003;
        }, i * 50);
      }
    }, 2500);
  };

  return (
    <>
      <Contain>
        <Canvas>
          <Suspense fallback={null}>
            <directionalLight intensity={1} />
            <ambientLight intensity={1.0} />
            <PerspectiveCamera
              onUpdate={updateHandler}
              makeDefault={true}
              far={300}
              near={0.1}
              fov={70.1}
              position={[0, 0, 6]}
              zoom={1}
            />
            <spotLight
              intensity={0.1}
              angle={0.1}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <pointLight position={[10, 10, 10]} />
            <Model
              position={[0, -2, -1]}
              rotation-y={Math.PI * 1.5}
              color="hotpink"
            />
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
  background: #ffffff;
`;
