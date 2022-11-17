import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { getBest3, getBestDress } from '../../redux/modules/BestDress';
import { getHelpCodi } from '../../redux/modules/HelpCodi';

import BestDresser from '../../components/Community/BestDresser';
import HelpCodi from '../../components/Community/HelpCodi';
import FooterBar from '../../components/ui/FooterBar';
import TopNav from '../../components/ui/TopNav';
import FirebaseUrl from '../../hooks/FirebaseUrl';


export interface BestDresserArticle {
  Best: {
    content: string,
    id: number,
    img: string,
    likeCount: number
  }
  user: {
    user_id: number,
    nickname: string,
    profile_img: string,
    email: string
  }
}

export interface HelpCodiArticle {
  Help: {
    help_id: number,
    help_img: string,
    range: string,
    open: boolean,
    title: string,
    content: string,
    user: {
      user_id: number,
      nickname: string,
      profile_img: string,
      email: string
    }
  }
}


export default function MainCommunity() {
  const {BestDress, Best3} = useAppSelector(state => state.BestDress)
  const {HelpCody} = useAppSelector(state => state.HelpCodi)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const [Best3Article, setBest3Article] = useState(Array<BestDresserArticle>)
  // const [BestArticles, setBestArticles] = useState(Array<BestDresserArticle>);
  // const [HelpArticles, setHelpArticles] = useState(Array<HelpCodiArticle>);

  useEffect(() => {
    const start = async () => {
      await dispatch(getBest3())
      await dispatch(getBestDress())
      await dispatch(getHelpCodi())
      
      // setBestArticles([...BestDress.splice(0,20)])
      // setHelpArticles([...HelpCody.splice(0,20)])
      // setBest3Article([...Best3])
    }
    start()
    
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
        {Best3.map((Best, index) => {
          const url = FirebaseUrl(Best)
          if (index === 1) {
            return (
              <div key={index} style={{display: 'inline'}}>
                <Best3Container style={{margin: '0 20px'}} src={Best.Best.img}/>
              </div>
            )
          } else {
            return (
              <div key={index} style={{display: 'inline'}}>
                <Best3Container src={url}/>
              </div>
            )
          }
        })}
      </List>

      <List>
        <Category onClick={()=>navigate('/community/BestDress')}>도전! 베스트 드레서✨</Category>
        <ArticleList>
          {BestDress.length > 0 && BestDress.map((BestArticle, index) => {
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
          {HelpCody.map((HelpArticle, index) => {
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
  min-height: 100px;
`

const Best3Container = styled.img`
  width: 100px;
  height: 120px;
  border-radius: 20px;
  margin-top: 10px;
  min-height: 100px;
`

export const CategoryText = styled.p`
  line-height: 0;
  font-family: var(--base-font-600);
`