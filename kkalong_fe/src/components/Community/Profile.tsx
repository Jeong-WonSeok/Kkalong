import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import defaultProfile from '../../assets/icon/Community/defaultProfile.png'
import FirebaseUrl from '../../hooks/FirebaseUrl'

export default function Profile({Image, Size, id} : {Image: string, Size: number, id: number}) {
  const navigate = useNavigate()
  return (
    <ProfileImg 
    style={{width: `${Size}px`, height: `${Size}px`}} 
    src={Image}
    onClick={()=>{navigate(`/myPage/${id}`)}}/>
  )
}


const ProfileImg = styled.img`
  border-radius: 50%;
  margin: 5px 6px 0 0;
`
