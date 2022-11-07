import React from 'react'
import styled from 'styled-components'
import defaultProfile from '../../assets/icon/Community/defaultProfile.png'

export default function Profile({Image, Size} : {Image: string, Size: number}) {
  return (
    <ProfileImg style={{width: `${Size}px`, height: `${Size}px`}} src={Image ? Image : defaultProfile}/>
  )
}


const ProfileImg = styled.img`
  border-radius: 50%;
  margin: auto 0;
  margin-right: 4px;
`
