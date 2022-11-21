const requests = {
  // 회원가입 및 로그인 관련
  login: "/user/login",
  kakao: "/oauth2/authorization/kakao",
  google: "/oauth2/authorization/google",
  email: "/user/signup/email",
  nickname: "/user/check/nickname",
  signup: "/user/signup",
  signupNext: "/user/signupNext",

  // 마이페이지
  myWrite: "/user/write/",
  myFriend: "/user/friends",
  searchFriend: "/user/friend/", // 이건 어떻게 구현될지 모르겠음
  updateProfile: "/user/profile/update",
  follow: "/user/follow/", // ${} 으로 동적 라우팅
  loving: "/user/love/",
  followers: "/user/followers/",
  followings: "/user/followings/",
  otherProfile: "/user/profile/", // ${} 으로 동적 라우팅
  otherWrite: "/user/write/", // ${} 으로 동적 라우팅
  Profile: "/user/social/login",
  changeImg: "user/profile/img",
  // 커뮤니티
  best3: "/community/best",
  bestDress: "/community/bestdress",
  detailBestDress: "/community/bestdress/", // ${} 으로 동적 라우팅
  comment: "/comment/",
  helpCodi: "/community/helpcodi",
  detailHelpCodi: "/community/helpcodi/", // ${} 으로 동적 라우팅

  // 옷장
  closet: "/closet/all/", // ${} 으로 동적 라우팅
  removeBackground: "/closet/removeBg",
  addClothes: "/closet/clothing", // requests.closet + ${} + requests.addClothes 이런식으로 써야할듯
  codi: "/closet/cody/",
  closetAdd: "/closet/closet",
  imgAdd: "closet/cody/img",
  codiDetail: "closet/codies/",

  // 가상피팅
  bodyImg: "/user/body/img",
  brand: "/aifitting/brand/", // brand_id를 넣으면 해당 브랜드의 제품이 나옴

  // 추천
  faceImg: "/recommend/personal",
  weather: "/recommend/weather/",
  personalColor: "/recommend/personalColor",
  body: "/recommend/body",
};

export default requests;
