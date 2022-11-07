import React from "react";
import { useState } from "react";
import styled from "styled-components";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";
import backArrow from "../../assets/icon/Nav/BackArrow.png";
import { BestDresserArticle } from "../Community/MainCommunity";
import { HelpCodiArticle } from "../Community/MainCommunity";
import { useNavigate } from "react-router-dom";
import BestDresser from "../../components/Community/BestDresser";
import HelpCodi from "../../components/Community/HelpCodi";
import { useEffect } from "react";

export default function MyPageArticle() {
  const name = "정원석";
  const [BestArticles, setBestArticles] = useState(Array<BestDresserArticle>);
  const [HelpArticles, setHelpArticles] = useState(Array<HelpCodiArticle>);

  const navigate = useNavigate();

  const goBestDress = () => {
    navigate('/community/BestDress')
  }

  useEffect(() => {
    // dispatch(getData)

    
  }, [])

  return (
    <MyPageArticleContainer>
      <TopNav type={""}>
        <MyPageArticleBackArrow src={backArrow}></MyPageArticleBackArrow>
        <MyPageArticleText>{name}님의 게시글</MyPageArticleText>
        <div style={{ width: "30px", height: "30px" }}></div>
      </TopNav>
      <Container>
        <List>
          <Category onClick={goBestDress}>도전! 베스트 드레서✨</Category>
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

const MyPageArticleContainer = styled.div``;

const MyPageArticleText = styled.div``;

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