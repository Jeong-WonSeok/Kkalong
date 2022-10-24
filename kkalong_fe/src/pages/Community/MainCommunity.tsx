import {useEffect, useState} from 'react'
import styled from 'styled-components'
import BestDresser from '../../components/Community/BestDresser';
import HelpCodi from '../../components/Community/HelpCodi';
import FooterBar from '../../components/ui/FooterBar';
import TopNav from '../../components/ui/TopNav';


export interface BestDresserArticle {
  post_img: string;
  post_user: {
    nickname: string,
    profile: string,
  }
  post_like: number
}

export interface HelpCodiArticle {
  help_img: string;
  user_id: {
    nickname: string,
    profile: string,
  }
  help_title: string
}


export default function MainCommunity() {
  const [Best3, setBest3] = useState([
    `https://m.rodenty.com/web/product/big/202204/88ead4b44cfbd86c80b237e0bbc4fc39.jpg`,
    `https://static.lookpin.co.kr/20210830111703-9bf7/376bff1f9197214c2f17f2881ae8c68c.jpg?resize=880`,
    `https://m.rodenty.com/web/product/big/202202/b9b6f434d554adbbae066c9d665004ab.jpg`
  ])
  const [BestArticles, setBestArticles] = useState(Array<BestDresserArticle>);
  const [HelpArticles, setHelpArticles] = useState(Array<HelpCodiArticle>);

  useEffect(() => {
    setBestArticles([
      {
        post_img: 'http://m.ippeumi.com/web/product/big/Vdaily20210410_25EA_j024.jpg',
        post_user: {
          nickname: 'loki535',
          profile: ''
        },
        post_like: 13
      },
      {
        post_img: 'https://i.pinimg.com/474x/e3/0a/73/e30a73291a0f8c2403c95472157d4b7e.jpg',
        post_user: {
          nickname: 'hans',
          profile: ''
        },
        post_like: 10
      },
      {
        post_img: 'https://www.ultrafashion.net/shopimages/girlsje/031001001172.jpg?1646365806',
        post_user: {
          nickname: 'jane13',
          profile: ''
        },
        post_like: 5
      },
      {
        post_img: 'https://sitem.ssgcdn.com/21/01/16/item/1000049160121_i1_1200.jpg',
        post_user: {
          nickname: 'likeme',
          profile: ''
        },
        post_like: 2
      },
    ])

    setHelpArticles([
      {
        help_img: 'https://i3.codibook.net/files/1978121543118/a553319d9394abde/70936325.jpg?class=big',
        user_id: {
          nickname: 'infp2',
          profile: ''
        },
        help_title: '20대 남자인데 데이트 코디 어떤가요?'
      },
      {
        help_img: 'https://i.pinimg.com/474x/85/06/4d/85064decf478772d1659c1aec4afd4b5.jpg',
        user_id: {
          nickname: 'poni',
          profile: ''
        },
        help_title: '새내기 코디 어때요?'
      },
      {
        help_img: 'https://i.pinimg.com/originals/94/8a/22/948a22cfbdd4554d964e7c4b84cc9a50.jpg',
        user_id: {
          nickname: 'Rabbit13',
          profile: ''
        },
        help_title: '친구랑 홍대갈 예정인데 이 정도면 평타?'
      },
      {
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
    <div>
    <Container>
      <TopNav type="menu">
        커뮤니티
        <div style={{width: '50px', height: '30px'}}></div>
      </TopNav>

      <List>
        <Category>오늘의 깔롱쟁이 🏆</Category>
        {Best3.map((Best, index) => {
          if (index == 1) {
            return (
              <Best3Container style={{margin: '0 20px'}} src={Best}/>
            )
          } else {
            return (
              <Best3Container src={Best}/>
            )
          }
        })}
      </List>

      <List>
        <Category>도전! 베스트 드레서 ✨</Category>
        <ArticleList>
          {BestArticles.map(BestArticle => {
            return (
              <BestDresser article={BestArticle}/>
            )
          })}
        </ArticleList>
      </List>

      <List>
        <Category>도와주세요 패알못 😂</Category>
        <ArticleList>
          {HelpArticles.map(HelpArticle => {
            return (
              <HelpCodi article={HelpArticle}/>
            )
          })}
        </ArticleList>
      </List>

     
    </Container>
    <FooterBar/>
    </div>
  )
}

const Container = styled.div`
  maring-bottom: 70px;
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
  height: 100px;
  border-radius: 20px;
  margin-top: 10px;
`