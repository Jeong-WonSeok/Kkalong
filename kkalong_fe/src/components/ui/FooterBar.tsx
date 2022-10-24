import React from 'react'
import styled from 'styled-components'
import closet from '../../assets/icon/Footer/closet.png'
import selectCloset from '../../assets/icon/Footer/select_closet.png'
import community from '../../assets/icon/Footer/community.png'
import selectCommunity from '../../assets/icon/Footer/select_community.png'
import mirror from '../../assets/icon/Footer/Mirror.png'
import recommend from '../../assets/icon/Footer/recommend.png'
import selectRecommend from '../../assets/icon/Footer/select_recommend.png'
import MyPage from '../../assets/icon/Footer/MyPage.png'
import selcetMyPage from '../../assets/icon/Footer/select_MyPage.png'



export default function FooterBar() {
  return (
    <FooterDiv>
        <FooterImgContainer>
            <FooterImg src={closet}/>
            옷장
        </FooterImgContainer>
        <FooterImgContainer>
            <FooterImg src={recommend}/>    
            추천
        </FooterImgContainer>
        <MirrorContainer>
            <MirrorImg src={mirror}/>
            가상피팅
        </MirrorContainer>
        <FooterImgContainer>
            <FooterImg src={community}/>
            커뮤니티
        </FooterImgContainer>
        <FooterImgContainer>
            <FooterImg src={MyPage}/>
            프로필
        </FooterImgContainer>
    </FooterDiv>
  )
}

const FooterDiv = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    font-family: var(--base-font-300);
    display:flex;
    justify-content:space-around;
    align-items: center;
    height: 70px;
`;

const FooterImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: var(--base-font-300);
    font-size: 10px;
    text-align: center;
    padding: 0 8px;
`

const MirrorContainer = styled(FooterImgContainer)`
    background: #DED6C6;
    color: white;
    padding: 8px;
    border-radius: 50%
`

const FooterImg = styled.img`
    height: 24px;
    width: 24px;
    margin: 0 auto;
`;

const MirrorImg = styled(FooterImg)`
    width: 20px;
    height: 100%;
`
