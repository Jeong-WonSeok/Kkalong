import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { HelpCodiArticle } from '../../pages/Community/MainCommunity'
import Profile from './Profile'
import defaultImg from '../../assets/icon/Community/defaultImg.png'

export interface MyHelpArticle {
  help_id: number,
  help_img: string | null,
  nickname: string,
  open: boolean,
  profile_img: string,
  range: string,
  title: string,
  user_id: number
}

export default function HelpCodi({article} : {article: MyHelpArticle}) {
  const navigate = useNavigate()
  console.log(article)
  return (
    <div onClick={()=>navigate(`/community/HelpCodi/false/${article.help_id}`)}>
    <Container style={{backgroundImage: `url(${article.help_img ? article.help_img : defaultImg})`}}>
      <ProfileContainer>
      <Profile Image={article.profile_img} Size={17} id={article.user_id}/>
        <span>{article.nickname}</span>
      </ProfileContainer>
      
    </Container>
    <TitleContainer>
      Q. {article.title.length < 15 ? article.title : article.title.slice(0, 15) + '...'}
    </TitleContainer>
    </div>
  )
}

const Container = styled.div`
  min-width: 140px;
  width: 140px;
  height: 180px;
  padding: 10px;
  border-radius: 30px 30px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px 0 0;
  background-position: center;
  background-size: cover;
  overflow: hidden;
`

const ProfileContainer = styled.div`
  font-family: var(--base-font-400);
  color: #AB9D9D;
  font-size: 12px;
  display: flex;
  flex-direction: row;
`

const ProfileImg = styled.img`
  width: 17px;
  height: 17px;
  border-radius: 8px;
  margin-right: 4px;
`

const TitleContainer = styled.div`
  height: 20px;
  width: 142px;
  background-color: var(--primary-color-500);
  font-family: var(--base-font-300);
  font-size: 7px;
  color: white;
  text-align: start;
  padding: 3px 9px;
  border-radius: 0 0 20px 20px; 
`

