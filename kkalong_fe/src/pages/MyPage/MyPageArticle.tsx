import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { BestDresserArticle } from "../Community/MainCommunity";
import { HelpCodiArticle } from "../Community/MainCommunity";
import axios from '../../api/axios'
import requests from '../../api/requests'

import BestDresser from "../../components/Community/BestDresser";
import HelpCodi from "../../components/Community/HelpCodi";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";

import backArrow from "../../assets/icon/Nav/BackArrow.png";
import { UserType } from "./MyPage";



export default function MyPageArticle() {
  const [BestArticles, setBestArticles] = useState(Array<BestDresserArticle>);
  const [HelpArticles, setHelpArticles] = useState(Array<HelpCodiArticle>);
  const [User, setUser] = useState<UserType>()

  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem('userProfile')as string))
    const start = async() => {
      const res = await axios.get(requests.myWrite)
      setBestArticles(res.data.Best)
      setHelpArticles(res.data.Help)
    }

    start()
  }, [])


  return (
    <MyPageArticleContainer>
      <TopNav type={""}>
        <MyPageArticleBackArrow src={backArrow} onClick={()=> navigate('/myPage')}></MyPageArticleBackArrow>
        <MyPageArticleText>{User?.nickname} 님의 게시글</MyPageArticleText>
        <div style={{ width: "30px", height: "30px" }}></div>
      </TopNav>
      <Container>
        <List>
          <Category>도전! 베스트 드레서✨</Category>
          <ArticleList>
            {BestArticles.map((BestArticle, index) => {
              return (
                <div key={index}>
                  <BestDresser article={BestArticle} />
                </div>
              );
            })}
          </ArticleList>
        </List>

        <List>
          <Category onClick={() => navigate("/community/HelpCodi")}>
            도와주세요 패알못😂
          </Category>
          <ArticleList>
            {HelpArticles.map((HelpArticle, index) => {
              return (
                <div key={index}>
                  <HelpCodi article={HelpArticle} />
                </div>
              );
            })}
          </ArticleList>
        </List>
      </Container>
      <FooterBar />
    </MyPageArticleContainer>
  );
}

const MyPageArticleContainer = styled.div`
`;

const MyPageArticleText = styled.div`
  font-family: var(--base-font-600);
`;

const MyPageArticleBackArrow = styled.img`
  width: 30px;
  height: 30px;
`;


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
`

const CategoryText = styled.p`
  line-height: 0;
  font-family: var(--base-font-600);
`