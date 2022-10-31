import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import closet from "../../assets/icon/Footer/closet.png";
import selectCloset from "../../assets/icon/Footer/select_closet.png";
import community from "../../assets/icon/Footer/community.png";
import selectCommunity from "../../assets/icon/Footer/select_community.png";
import mirror from "../../assets/icon/Footer/Mirror.png";
import recommend from "../../assets/icon/Footer/recommend.png";
import selectRecommend from "../../assets/icon/Footer/select_recommend.png";
import MyPage from "../../assets/icon/Footer/MyPage.png";
import selcetMyPage from "../../assets/icon/Footer/select_MyPage.png";


export default function FooterBar() {
  const navigate = useNavigate()
  const [SelectCategory, setSelectCategory] = useState('closet')
  let url = window.location.href

  useEffect(()=> {
    // url 포함 여부로 체크
    url = window.location.href
    if (url.includes('community')) {
      return setSelectCategory(current => {
        let NewWord = current
        NewWord = 'community'
        return NewWord
      })
    } else if (url.includes('closet')) {
      return setSelectCategory(current => {
        let NewWord = current
        NewWord = 'closet'
        return NewWord
      })
    } else if (url.includes('mirror')) {
      return setSelectCategory(current => {
        let NewWord = current
        NewWord = 'mirror'
        return NewWord
      })
    } else if (url.includes('recommend')) {
      return setSelectCategory(current => {
        let NewWord = current
        NewWord = 'recommend'
        return NewWord
      })
    } else if (url.includes('profile')) {
      return setSelectCategory(current => {
        let NewWord = current
        NewWord = 'profile'
        return NewWord
      })
    } 
  },[url, selectCloset])

  const GoNavigate = (type: string) => {
    navigate(`/${type}`)
  }
  
  return (
    <FooterDiv>
      <FooterImgContainer>
        <FooterImg src={SelectCategory==="closet" ? selectCloset : closet} onClick={()=>GoNavigate('closet')}/>
        옷장
      </FooterImgContainer>
      <FooterImgContainer>
        <FooterImg src={SelectCategory==="recommend" ? selectRecommend : recommend} onClick={()=>GoNavigate('recommend')}/>
        추천
      </FooterImgContainer>
      <MirrorContainer>
        <MirrorImg src={mirror} onClick={()=>GoNavigate('mirror')}/>
        가상피팅
      </MirrorContainer>
      <FooterImgContainer>
        <FooterImg src={SelectCategory==="community" ? selectCommunity : community} onClick={()=>GoNavigate('community')}/>
        커뮤니티
      </FooterImgContainer>
      <FooterImgContainer>
        <FooterImg src={SelectCategory==="profile" ? selcetMyPage : MyPage} onClick={()=>GoNavigate('profile')}/>
        프로필
      </FooterImgContainer>
    </FooterDiv>
  );
}

const FooterDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 360px;
  font-family: var(--base-font-300);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  background-color: white;
`;

const FooterImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--base-font-300);
  font-size: 10px;
  text-align: center;
  padding: 0 8px;
`;

const MirrorContainer = styled(FooterImgContainer)`
  background: #ded6c6;
  color: white;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0px 0px 8px 0px;
`;

const FooterImg = styled.img`
  height: 24px;
  width: 24px;
  margin: 0 auto;
`;

const MirrorImg = styled(FooterImg)`
  width: 20px;
  height: 100%;
`;
