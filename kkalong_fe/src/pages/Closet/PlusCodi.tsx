import React from "react";
import styled from "styled-components";

export default function index() {
  return (
    <div>
      <div>
        OOO님의 옷장
        <ClosetEnter>
          <EnterText>저장</EnterText>
        </ClosetEnter>
      </div>
    </div>
  );
}

const ClosetEnter = styled.button`
  height: 30px;
  width: 60px;
  background-color: var(--primary-color-400);
  border: none;
  border-radius: 30px;
  position: relative;
  top: 3px;
`;
const EnterText = styled.span`
  color: white;
`;
