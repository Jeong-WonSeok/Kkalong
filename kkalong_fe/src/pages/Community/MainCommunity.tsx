import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { getBest3, getBestDress } from '../../redux/modules/BestDress';

import BestDresser from '../../components/Community/BestDresser';
import HelpCodi from '../../components/Community/HelpCodi';
import FooterBar from '../../components/ui/FooterBar';
import TopNav from '../../components/ui/TopNav';
import { getHelpCodi } from '../../redux/modules/HelpCodi';

export interface BestDresserArticle {
  post_id: number,
  post_img: string,
  post_user: {
    nickname: string,
    profile: string,
  }
  post_like: number
}

export interface HelpCodiArticle {
  help_id: Number;
  help_img: string;
  user_id: {
    nickname: string,
    profile: string,
  }
  help_title: string
}


export default function MainCommunity() {
  const {BestDress, Best3} = useAppSelector(state => state.BestDress)
  const {HelpCody} = useAppSelector(state => state.HelpCodi)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [Best3Article, setBest3Article] = useState(Array<BestDresserArticle>)
  const [BestArticles, setBestArticles] = useState(Array<BestDresserArticle>);
  const [HelpArticles, setHelpArticles] = useState(Array<HelpCodiArticle>);

  useEffect(() => {
    const start = () => {
      dispatch(getBest3())
      dispatch(getBestDress())
      dispatch(getHelpCodi())
      setBestArticles([...BestDress.splice(0,20)])
      setHelpArticles([...HelpCody.splice(0,20)])
      setBest3Article([...Best3])
    }
    start()
    
    
    // setHelpArticles([
    //   {
    //     help_id: 1,
    //     help_img: 'https://i3.codibook.net/files/1978121543118/a553319d9394abde/70936325.jpg?class=big',
    //     user_id: {
    //       nickname: 'infp2',
    //       profile: ''
    //     },
    //     help_title: '20대 남자인데 데이트 코디 어떤가요?'
    //   },
    //   {
    //     help_id: 2,
    //     help_img: 'https://i.pinimg.com/474x/85/06/4d/85064decf478772d1659c1aec4afd4b5.jpg',
    //     user_id: {
    //       nickname: 'poni',
    //       profile: ''
    //     },
    //     help_title: '새내기 코디 어때요?'
    //   },
    //   {
    //     help_id: 3,
    //     help_img: 'https://i.pinimg.com/originals/94/8a/22/948a22cfbdd4554d964e7c4b84cc9a50.jpg',
    //     user_id: {
    //       nickname: 'Rabbit13',
    //       profile: ''
    //     },
    //     help_title: '친구랑 홍대갈 예정인데 이 정도면 평타?'
    //   },
    //   {
    //     help_id: 4,
    //     help_img: 'https://i.pinimg.com/originals/4a/22/8b/4a228b0859fc11f0c28525d7cd0c059a.jpg',
    //     user_id: {
    //       nickname: 'loki535',
    //       profile: ''
    //     },
    //     help_title: '겨울 데이트룩 괜찮은가요?'
    //   },
    // ])
  }, [])
  
  return (
    <div>
    <TopNav type="menu">
      <CategoryText>커뮤니티</CategoryText>
      <div style={{width: '50px', height: '30px'}}></div>
    </TopNav>

    <Container>
      <List>
        <Category>오늘의 깔롱쟁이🏆</Category>
        {Best3Article.map((Best, index) => {
          if (index === 1) {
            return (
              <div key={index} style={{display: 'inline'}}>
                <Best3Container style={{margin: '0 20px'}} src={Best.post_img}/>
              </div>
            )
          } else {
            return (
              <div key={index} style={{display: 'inline'}}>
                <Best3Container src={Best.post_img}/>
              </div>
            )
          }
        })}
      </List>

      <List>
        <Category onClick={()=>navigate('/community/BestDress')}>도전! 베스트 드레서✨</Category>
        <ArticleList>
          {BestArticles.length > 0 && BestArticles.map((BestArticle, index) => {
            return (
              <div key={index}>
                <BestDresser article={BestArticle}/>
              </div>
            )
          })}
        </ArticleList>
      </List>

      <List>
        <Category onClick={()=> navigate('/community/HelpCodi')}>도와주세요 패알못😂</Category>
        <ArticleList>
          {HelpArticles.map((HelpArticle, index) => {
            return (
              <div key={index}>
                <HelpCodi article={HelpArticle}/>
              </div>
            )
          })}
        </ArticleList>
      </List>

    </Container>
    <FooterBar/>
    </div>
  )
}

export const Container = styled.div`
  padding: 10px;
`

const Category = styled.p`
 margin: 0;
 margin-left: 10px;
`

const List = styled.div`
  font-family: var(--base-font-500);
  font-size: 18px;
  margin-bottom: 20px;
`

const ArticleList = styled.div` 
  width: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  overflow: scroll;
`

const Best3Container = styled.img`
  width: 100px;
  height: 120px;
  border-radius: 20px;
  margin-top: 10px;
`

const CategoryText = styled.p`
  line-height: 0;
  font-family: var(--base-font-600);
`