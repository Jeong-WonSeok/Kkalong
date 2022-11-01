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

    setBestArticles([
      {
        post_id: 1,
        post_img: 'http://m.ippeumi.com/web/product/big/Vdaily20210410_25EA_j024.jpg',
        post_user: {
          nickname: 'loki535',
          profile: ''
        },
        post_like: 13
      },
    ])
    setHelpArticles([
      {
        help_id: 1,
        help_img: 'https://i3.codibook.net/files/1978121543118/a553319d9394abde/70936325.jpg?class=big',
        user_id: {
          nickname: 'infp2',
          profile: ''
        },
        help_title: '20대 남자인데 데이트 코디 어떤가요?'
      },
      {
        help_id: 2,
        help_img: 'https://i.pinimg.com/474x/85/06/4d/85064decf478772d1659c1aec4afd4b5.jpg',
        user_id: {
          nickname: 'poni',
          profile: ''
        },
        help_title: '새내기 코디 어때요?'
      },
      {
        help_id: 3,
        help_img: 'https://i.pinimg.com/originals/94/8a/22/948a22cfbdd4554d964e7c4b84cc9a50.jpg',
        user_id: {
          nickname: 'Rabbit13',
          profile: ''
        },
        help_title: '친구랑 홍대갈 예정인데 이 정도면 평타?'
      },
      {
        help_id: 4,
        help_img: 'https://i.pinimg.com/originals/4a/22/8b/4a228b0859fc11f0c28525d7cd0c059a.jpg',
        user_id: {
          nickname: 'loki535',
          profile: ''
        },
        help_title: '겨울 데이트룩 괜찮은가요?'
      },
    ])
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