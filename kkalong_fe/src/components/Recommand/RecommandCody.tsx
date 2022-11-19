import React from 'react'
import styled from 'styled-components'
import { CodyType } from '../../redux/modules/Weather'

export default function RecommandCody({Cody} : {Cody: CodyType}) {

  return (
    <Container>
      {Cody.outer && <ClothImg src={Cody.outer.img} style={{top: '5px', left: '5px', zIndex: '-1'}}/>}
      <ClothImg src={Cody.top.img} style={{top: '10px', left: '10px', zIndex: '1'}}/>
      <ClothImg src={Cody.bottom.img} style={{top: '70px', left: '10px', zIndex: '2'}}/>
      <ClothImg src={Cody.shoes.img} style={{top: '70px', left: '70px', zIndex: '-1'}}/>
      {Cody.bag && <ClothImg src={Cody.bag.img} style={{top: '10px', left: '70px', zIndex: '-1'}}/>}
      {Cody.hat && <ClothImg src={Cody.hat.img} style={{top: '10px', left: '70px', zIndex: '-1'}}/>}
    </Container>
  )
}

const Container = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 10px;
  border: 2px solid var(--primary-color-500);
`

const ClothImg = styled.img`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 10px;
`