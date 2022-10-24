import styled from 'styled-components'
import { HelpCodiArticle } from '../../pages/Community/MainCommunity'
import defaultProfile from '../../assets/icon/Community/defaultProfile.png'

export default function HelpCodi({article} : {article: HelpCodiArticle}) {
  return (
    <div>
    <Container style={{backgroundImage: `url(${article.help_img})`}}>
      <ProfileContainer>
        <ProfileImg src={article.user_id.profile ? article.user_id.profile : defaultProfile}/>
        <span>{article.user_id.nickname}</span>
      </ProfileContainer>
      
    </Container>
    <TitleContainer>
      Q. {article.help_title.length < 15 ? article.help_title : article.help_title.slice(0, 15) + '...'}
    </TitleContainer>
    </div>
  )
}

const Container = styled.div`
  min-width: 140px;
  height: 180px;
  padding: 10px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px 0 0;
  background-size: cover;
  overflow: hidden
`

const ProfileContainer = styled.div`
  font-family: var(--base-font-300);
  color: black;
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
  height: 23px;
  width: 150px;
  background-color: var(--primary-color-500);
  font-size: 7px;
  color: white;
  padding: 3px 4px 0 6px;
  border-radius: 0 0 30px 30px; 
`