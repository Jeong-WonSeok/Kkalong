import React from 'react'
import styled from 'styled-components'
import defaultProfile from '../../assets/icon/Community/defaultProfile.png'
import FirebaseUrl from '../../hooks/FirebaseUrl'

export default function Profile({Image, Size} : {Image: string, Size: number}) {
  return (
    <ProfileImg style={{width: `${Size}px`, height: `${Size}px`}} src={Image !== null? Image : defaultProfile}/>
  )
}


const ProfileImg = styled.img`
  border-radius: 50%;
  margin: 5px 6px 0 0;
`
