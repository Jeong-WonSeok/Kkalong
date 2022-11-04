const requests = {
    // 회원가입 및 로그인 관련
    login: '/user/login',
    kakao: '/oauth2/authorization/kakao',
    google: '/oauth2/authorization/google',
    email: '/user/signup/email',
    nickname: '/user/check/nickname',
    signup: '/user/signup',
    
    // 마이페이지
    myWrite: '/user/write',
    myFriend: '/user/friend',
    searchFriend: '/user/friend/search_nickname', // 이건 어떻게 구현될지 모르겠음
    updateProfile: '/user/profile/update',
    follow: '/user/follow/', // ${} 으로 동적 라우팅
    otherProfile: '/user/profile/', // ${} 으로 동적 라우팅
    otherWrite: '/user/write/', // ${} 으로 동적 라우팅

    // 커뮤니티
    best3: '/community/best',
    bestDress: '/community/bestdress',
    detailBestDress: '/community/bestdress/', // ${} 으로 동적 라우팅
    comment: '/comment/',
    helpCodi: '/community/helpCodi',
    detailHelpCodi: '/community/helpCodi/', // ${} 으로 동적 라우팅
    
    // 옷장
    closet: '/closet/', // ${} 으로 동적 라우팅
    removeBackground: '/closet/remove_background',
    addClothes: '/add/clothes', // requests.closet + ${} + requests.addClothes 이런식으로 써야할듯
    codl: '/cody',

    // 가상피팅
    brand: '/aifitting/brand/', // brand_id를 넣으면 해당 브랜드의 제품이 나옴
   
    // 추천
    weather: '/recommand/weather',
    body: '/recommand/body'
  }
  
  export default requests;