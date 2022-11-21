import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import styled from "styled-components";
import Model from "./Model";

import { useNavigate } from "react-router-dom";

const Example = () => {




  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/closet')
    
  }, 12000)
  
  // const updateHandler = (e) => {
  //   // console.log("업뎃핸들러")
  //   setTimeout(()=> {
  //     setTimeout(()=> {
  //       // navigate('/VirtualFitting/VirtualBrandChoice/')
  //     },2500)
  //     for(let i=0; i<110; i++) {
  //       setTimeout(()=> {
  //         e.scale.z += i *0.003;
  //       }, i * 50)
  //     }
  //   },2500)
  // }



  return (
    <>
      <Contain>
        <Canvas >
          <Suspense fallback={null}>
            <pointLight
              intensity={0.3}
              position={[0,7,-1]}
            />
            <pointLight
              intensity={1.2}
              position={[7,8,4]}
            />
            <Model
            />
{/* 
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            /> */}
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
