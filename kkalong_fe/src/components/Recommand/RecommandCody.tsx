import React from "react";
import styled from "styled-components";
import { CodyType } from "../../redux/modules/Recommend";

export default function RecommandCody({ Cody }: { Cody: CodyType }) {
  return (
    <Container>
      {Cody.outer.length ? (
        <ClothImg
          src={Cody.outer[0].img}
          style={{ top: "5px", left: "5px", zIndex: "1" }}
        />
      ) : null}
      <ClothImg
        src={Cody.top[0].img}
        style={{ top: "10px", left: "10px", zIndex: "2" }}
      />
      <ClothImg
        src={Cody.bottom[0].img}
        style={{ top: "70px", left: "10px", zIndex: "3" }}
      />
      <ClothImg
        src={Cody.shoes[0].img}
        style={{ top: "70px", left: "70px", zIndex: "1" }}
      />
      {Cody.bag.length ? (
        <ClothImg
          src={Cody.bag[0].img}
          style={{ top: "10px", left: "70px", zIndex: "1" }}
        />
      ) : null}
      {Cody.hat.length ? (
        <ClothImg
          src={Cody.hat[0].img}
          style={{ top: "10px", left: "70px", zIndex: "1" }}
        />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  margin: 3px 7px;
  min-width: 150px;
  max-width: 150px;
  min-height: 150px;
  max-height: 150px;
  position: relative;
  border-radius: 10px;
  border: 3px solid var(--primary-color-500);
  background-color: white;
`;

const ClothImg = styled.img`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;
