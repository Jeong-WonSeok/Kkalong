import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import TopNav from '../../components/ui/TopNav'
import FooterBar from '../../components/ui/FooterBar'
import BestDresser from '../../components/Community/BestDresser'
import { BestDresserArticle, Container } from './MainCommunity'

import backArrow from '../../assets/icon/Nav/BackArrow.png'
import AddArticle from '../../assets/icon/Community/addArticle.png'

export default function MainBestDress() {
  const navigate = useNavigate()
  const [BestArticles, setBestArticles] = useState(Array<BestDresserArticle>)

  useEffect(() => {
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
      {
        post_id: 2,
        post_img: 'https://i.pinimg.com/474x/e3/0a/73/e30a73291a0f8c2403c95472157d4b7e.jpg',
        post_user: {
          nickname: 'hans',
          profile: ''
        },
        post_like: 10
      },
      {
        post_id: 3,
        post_img: 'https://www.ultrafashion.net/shopimages/girlsje/031001001172.jpg?1646365806',
        post_user: {
          nickname: 'jane13',
          profile: ''
        },
        post_like: 5
      },
      {
        post_id: 4,
        post_img: 'https://sitem.ssgcdn.com/21/01/16/item/1000049160121_i1_1200.jpg',
        post_user: {
          nickname: 'likeme',
          profile: ''
        },
        post_like: 2
      },
    ])
  }, [])

  return (
    <div>
      <TopNav type={""}>
        <BackArrow src={backArrow} onClick={()=>navigate('/community')}/>
        <CategoryText>도전! 베스트 드레서✨</CategoryText>
        <div style={{ width: '30px', height: '30px'}}></div>
      </TopNav>

      <BestContainer>
        {BestArticles.map((BestArticle, idx) => {
          return (
            <div key={idx}>
              <BestDresser article={BestArticle}/>
            </div>
          )
        })}
      </BestContainer>

      <FooterBar/>
      
      <PlusDiv>
        <PlusImg src={AddArticle} onClick={()=> navigate('/community/BestDress/Add')}/>
      </PlusDiv>
    </div>
  )
}

const BestContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const BackArrow = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
`

export const CategoryText = styled.p`
  line-height: 0;
  font-family: var(--base-font-600);
`

export const PlusDiv = styled.div`
  position: fixed;
  width:100%;
  height: 60px;
  max-width: 360px;
  left: auto;
  bottom: 70px;
`

export const PlusImg = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.23));
`