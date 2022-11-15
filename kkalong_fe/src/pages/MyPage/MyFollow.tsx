import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHook'

import TopNav from '../../components/ui/TopNav'
import Friend from '../../components/User/Friend'

import BackArrow from '../../assets/icon/Nav/BackArrow.png'

import axios from '../../api/axios'
import requests from '../../api/requests'
import { BackArrowImg } from '../Signup/Signup'
import { CategoryText } from '../Community/MainCommunity'
import { otherUserType, UserType } from './MyPage'
import styled from 'styled-components'

interface followType {
  user_id : number
  nickname  : string
  profile_img : string
  isLoving : boolean
  lover_id : number 
}

export default function MyFollow() {
  const {User, otherUser} = useAppSelector(state=>state.User)
  const params = useParams()
  const navigate = useNavigate()
  const [ FollowList, setFollowList ] = useState(Array<followType>)
  const [ Category, setCategory ] = useState('')

  const [ProfileUser, setProfileUser] = useState<UserType | otherUserType>()

  useEffect(() => {  
    const start = async () => {
      if (params.userId) {
        setProfileUser(otherUser)
        if (window.location.href.includes('Follow')) {
          const res = await axios.get(requests.followers + params.userId)
          setFollowList(res.data.followers)
          setCategory('팔로잉')
        } else {
          const res = await axios.get(requests.followings + params.userId)
          setFollowList(res.data.followings)
          setCategory('팔로워')
        }
      } else {
        setProfileUser(User)
        if (window.location.href.includes('Follow')) {
          const res = await axios.get(requests.followers + User.user_id)
          setFollowList(res.data.followers)
          setCategory('팔로잉')
        } else {
          const res = await axios.get(requests.followings + User.user_id)
          setFollowList(res.data.followings)
          setCategory('팔로워')
        }
      }
    }

    start()

  }, [])
  
  return (
    <div>
      <TopNav type={''}>
        <BackArrowImg src={BackArrow} onClick={()=> navigate(-1)}/>
        <CategoryText>{ProfileUser?.nickname} 님의 {Category}</CategoryText>
        <div style={{width: '30px', height: '30px'}}></div>
      </TopNav>

      <Container>
        <Friend Friend={FollowList} IsSearch={false}></Friend>
      </Container>
    </div>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
