import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { HelpCodiArticle } from '../../pages/Community/MainCommunity'
import Profile from './Profile'
import defaultImg from '../../assets/icon/Community/defaultImg.png'

export default function HelpCodi({article} : {article: HelpCodiArticle}) {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/community/HelpCodi/false/${article.Help.help_id}`)}>
    <Container style={{backgroundImage: `url(${article.Help.help_img ? article.Help.help_img : defaultImg})`}}>
      <ProfileContainer>
      <Profile Image={article.Help.user.profile_img} Size={17} id={article.Help.user.user_id}/>
        <span>{article.Help.user.nickname}</span>
      </ProfileContainer>
      
    </Container>
    <TitleContainer>
      Q. {article.Help.title.length < 15 ? article.Help.title : article.Help.title.slice(0, 15) + '...'}
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