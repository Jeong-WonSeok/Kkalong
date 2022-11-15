import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios'
import requests from '../../api/requests'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { follow, otherProfile } from '../../redux/modules/User';

import HelloIcon from '../../assets/icon/MyPage/hello.png'
import MyImg from '../../assets/icon/MyPage/My.png'
import ArticleIcon from '../../assets/icon/MyPage/article.png'
import FriendIcon from '../../assets/icon/MyPage/friend.png'
import MemberUpdateIcon from '../../assets/icon/MyPage/memberUpdate.png'
import MoveIcon from '../../assets/icon/MyPage/move.png'

import FooterBar from '../../components/ui/FooterBar';
import { FollowBtn } from '../../components/User/Friend';

export interface otherUserType {
  user_id : number
  nickname : string
  followers : Array<number>
  followings : Array<number>
  profile_img : string
}

export interface UserType extends otherUserType{
  email : string
  gender : string
  age : number
  height : number
  weight : number
}

export default function MyPage() {
  const params = useParams()
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {User, otherUser} = useAppSelector(state => state.User)
  const [ProfileUser, setProfileUser] = useState<UserType | otherUserType>()  

  useEffect(()=>{
    const app = document.getElementById('App') as HTMLDivElement
    app.style.marginTop = '0'
    const start = async() => {
      if (params.userId) {
        // 정보 요청이 안됨...
        dispatch(otherProfile(Number(params.userId)))
        setProfileUser(otherUser)
      } else {
        setProfileUser(User)
        console.log(User)
      }
    }
    start()
    return () => {
      app.style.marginTop = '60px'
    }
  },[])

  const InputClick = () => {
    document.getElementById('Input')?.click()
  }

  const ChangeProfile = (e:any) => {
    if (!params.userId) {
      const img = document.getElementById('UserProfile') as HTMLImageElement
      const ImgUrl = URL.createObjectURL(e.target.files[0])
      // 완성되기 전까지 임시로
      img.src = ImgUrl
      // axios.post(requests.changeImg,{profile_img: e.target.files[0]}) 
      //   .then(res => {
      //     setUser((current) => ({
      //       ...current as UserType,
      //       profile_img: res.data
      //     }))
      //     localStorage.setItem("userProfile", JSON.stringify(User));
      //   })
      //   .catch(err => {
      //     alert('에러가 발생하였습니다. 다시 시도해주세요')
      //   })
    }
  }

  const Follow = (id: number) => {
    dispatch(follow(String(id)))
  }

  return (
    <div>
      <MyPageDiv>
        <MyPageText>마이페이지</MyPageText>
        <MyPageTextDiv>
          <div>
            <MyPageHelloText>안녕하세요!</MyPageHelloText>
            <MyPageHelloIcon src={HelloIcon}></MyPageHelloIcon>
          </div>
          <NickNameP>{ProfileUser?.nickname} 님!</NickNameP>
        </MyPageTextDiv>
        <MyPageImg id="UserProfile" src={MyImg} onClick={InputClick}></MyPageImg>
        {!params.user_id && <ChangeImgInput id="Input" type="file" accept='image/*' onChange={ChangeProfile}/>}
        
        <MyPageFollowDiv>
          <MyPageFollow onClick={()=>navigate('Follow')}>팔로우 {ProfileUser?.followings.length ? ProfileUser?.followings.length : 0}</MyPageFollow>
          <MyPageLine onClick={()=>navigate('Following')}></MyPageLine>
          <MyPageFollow>팔로워 {ProfileUser?.followers.length ? ProfileUser?.followers.length : 0}</MyPageFollow>
          {params.user_id && <OtherPeopleBtn onClick={() => Follow(User!.user_id)}>{User.followings.includes(User!.user_id) ? "언팔로우" : "팔로우" }</OtherPeopleBtn>}
        </MyPageFollowDiv>
      </MyPageDiv>

      <MyPageUnderDiv>
        
      <MyPageUnderButton onClick={()=> navigate('Article')}>
        <MyPageIconTextDiv>
          <MyPageButtonIcon src={ArticleIcon}/>
          <MyPageButtonText>게시물</MyPageButtonText>
        </MyPageIconTextDiv>
        <MyPageButtonMove src={MoveIcon}/>
      </MyPageUnderButton>
      {!params.userId && 
      <div>
        <MyPageUnderButton onClick={()=>navigate(`Friend`)}>
          <MyPageIconTextDiv>
            <MyPageButtonIcon src={FriendIcon}/>
            <MyPageButtonText>친구</MyPageButtonText>
          </MyPageIconTextDiv>
          <MyPageButtonMove src={MoveIcon}/>
        </MyPageUnderButton>

        <MyPageUnderButton onClick={()=>navigate('Update')}>
          <MyPageIconTextDiv> 
            <MyPageButtonIcon src={MemberUpdateIcon}/>
            <MyPageButtonText>회원정보 수정</MyPageButtonText>
          </MyPageIconTextDiv>
          <MyPageButtonMove src={MoveIcon}/>
        </MyPageUnderButton>
      </div>
      }

      </MyPageUnderDiv>
      <FooterBar/>
    </div>

  )
}


const MyPageDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  background-color: #947F6C;
  height:50%;
  min-height: 300px;
`


const MyPageText = styled.text`
  font-size: 16px;
  font-family: var(--base-font-600);
  position : absolute;
  left : 10px;
  top : 10px;
  `

const MyPageTextDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  margin-top : 55px;
`

//마이페이지 아이콘
const MyPageHelloIcon = styled.img`
  margin-left: 3px;
`

//인사말 
const MyPageHelloText = styled.text`
  font-family: var(--base-font-400);
  font-size: 1.1rem;
  color: black;
  
`

const NickNameP = styled.text`
  font-family: var(--base-font-400);
  color: var(--primary-color-200);
  font-size: 1.1rem;
`

//프로필 이미지
const MyPageImg = styled.img`
  margin: 10px;
  border: 2px solid #000000;
  border-radius: 50%;
  width : 110px;
  height : 110px;
`

//팔로우, 팔로워 div
const MyPageFollowDiv = styled.div`
  display : flex;
  flex-direction: row;
`

const MyPageLine = styled.div`
  margin: 10px 0;
  width : 2px;
  height: 21px;
  background-color: #FFFFFF;
`


// 팔로우, 팔로워
const MyPageFollow = styled.text`
  margin : 10px;
  font-size: 16px;
  color : var(--primary-color-100);
  font-family: var(--base-font-400);
`

//마이페이지 하단 부분 div
const MyPageUnderDiv = styled.div`
  padding: 10px;
`

//각 게시물, 친구, 회원정보 수정 등으로 이동
const MyPageUnderButton = styled.div`
 display : flex ;
 flex-direction: row;
 justify-content: space-between;  
 margin : 10px;
 padding: 15px 10px;
`
//아이콘,글 div
const MyPageIconTextDiv = styled.div`
  display : flex;
  flex-direction: row;
  width:150px;

`

//버튼 아이콘
const MyPageButtonIcon = styled.img`
`

//버튼 text
const MyPageButtonText = styled.text`
  margin-left : 20px;
  font-family: var(--base-font-500); 
`

//버튼 move
const MyPageButtonMove = styled.img`
margin: auto 0;
width: 10px;
height: 15px;
`

const ChangeImgInput = styled.input`
  display: none;
`

const OtherPeopleBtn = styled(FollowBtn)`
    margin : 10px;
`