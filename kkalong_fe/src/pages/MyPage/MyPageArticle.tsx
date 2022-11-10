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



export default function MyPageArticle() {
  const params = useParams()
  const [BestArticles, setBestArticles] = useState(Array<BestDresserArticle>);
  const [HelpArticles, setHelpArticles] = useState(Array<HelpCodiArticle>);
  const [User, setUser] = useState<UserType>()

  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem('userProfile')as string))
    const start = async() => {
      if (params.user_id) {
        // 정보 요청이 안됨...
        const Input = {value: Number(params.userId)}
        const res = await axios.get(requests.otherProfile, {params: Input})
        setUser(res.data.user)
        
        // 글쓴이의 글 목록 불러오기
        const wirte = await axios.get(requests.myWrite, {params: {value: User!.user_id}})
        setBestArticles(wirte.data.Best)
        setHelpArticles(wirte.data.Help)
        
      } else {
        const res = await axios.get(requests.myWrite)
        setBestArticles(res.data.Best)
        setHelpArticles(res.data.Help)
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