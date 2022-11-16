import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useAppSelector } from "../../hooks/reduxHook";



export default function MyPageArticle() {
  const params = useParams()
  const { User, otherUser } = useAppSelector(state => state.User)
  const [BestArticles, setBestArticles] = useState(Array<BestDresserArticle>);
  const [HelpArticles, setHelpArticles] = useState(Array<HelpCodiArticle>);

  const navigate = useNavigate();

  useEffect(() => {
    const start = async() => {
      if (params.userId) {
        // 글쓴이의 글 목록 불러오기
        const wirte = await axios.get(requests.myWrite + otherUser.user_id)
        setBestArticles(wirte.data.Bests)
        setHelpArticles(wirte.data.Helps)
        
      } else {
        const res = await axios.get(requests.myWrite + User.user_id)
        setBestArticles(res.data.Bests)
        setHelpArticles(res.data.Helps)
      }
    }

    start()
  }, [])


  return (
    <MyPageArticleContainer>
      <TopNav type={""}>
        <MyPageArticleBackArrow src={backArrow} onClick={()=> navigate(-1)}></MyPageArticleBackArrow>
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