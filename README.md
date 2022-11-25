# README

태그: 발표

![Untitled](README%201af88fb833584e009b80e7317bd8aa57/Untitled.png)

## 깔롱 - 나만의 옷장 서비스

[**웹 사이트](http://k7b302.p.ssafy.io) / [플레이스토어](https://play.google.com/store/apps/details?id=com.kkalong.webviewkt)**

## **📅 프로젝트 진행 기간**

2202.10.11(화) ~ 2022.11.21(월) (30일간 진행)

SSAFY 7기 2학기 자율프로젝트 - 깔롱

## 👗 깔롱 - 기획배경

코로나 해제로 온라인, 제택 근무가 줄고 오프라인으로 바뀌고 있는데 어떤 옷을 입고 나가야할지 매일 고민하는 사람들을 위해, 그리고 소개팅, 상견레, 특별한 상황에서 어떠한 옷을 입어야할 지 고민인 사람들을 위해서 기획하였습니다.

## ****📜 깔롱 - 개요****

옷장을 통해서 자신의 옷을 등록하고 코디를 만들 수 있고 내가 만든 코디를 유저들에게 피드백 받거나 자신의 옷장을 유저들에게 보여주어 코디를 추천받을 수 있어요

저희 추천기능을 통해서 날씨, 퍼스널 컬러, 체형에 따라 코디를 추천받을 수 있어요. 날씨는 일주일의 코디를, 퍼스널 컬러는 유저의 얼굴 사진을 기반으로 색상을 추출하고 퍼스널 컬러를 기반으로 추천해요.

## 🔧 깔롱 - 주요기능

- **옷장**
    - 옷 사진을 찍고 추가적인 정보를 기입하여 옷을 등록
    - 옷장을 추가적으로 만들어 자주 입는 옷이나 계절별로 옷을 유저가 분리할 수 있어요
    - 등록된 옷을 배치해서 자유롭게 코디를 만들 수 있습니다.
- **추천**
    - 기상청 api를 활용해서 현재 위치의 날씨를 불러오고 기온에 맞는 옷차림을 추천합니다.
    - **퍼스널 컬러**는 유저가 얼굴 사진을 등록하면 퍼스널 컬러를 분석하여 유저와 어울리는 색조합으로 코디를 추천합니다.
    - 체형 추천은 유저의 체형을 역삼각형, 사각형… 으로 나누어 해당 체형과 어울리는 옷으로 코디를 추천합니다.
- **가상피팅**
    - 유저의 전신샷을 기반으로 옷을 선택하여 해당 옷을 미리 입어볼 수 있는 기능입니다.
        - 기술적인 한계로 현재는 상의만 가능합니다.
- **커뮤니티**
    - 자신의 코디를 남들에게 뽐낼수 있는 **베스트 드레서**
        - 베스트 드레서는 일주일을 기준으로 좋아요를 많이받은 3개의 게시물이 상위에 게시됩니다.
    - 누군가에게 자신의 코디를 추천받고 싶다면 **도와주세요 패알못**
        - 자신이 만든 코디를 올려 유저들에게 피드백받을 수 있습니다.
        - 어떤 옷을 입어야할지 감이 안잡힌다면 옷장을 공개하여 유저들이 코디를 직접 추천해 줄 수 있습니다.
        - 모두에게 옷장 공개가 꺼려진다면 공개 범위를 줄여 친구에게만 오픈할 수도 있습니다.
- **마이페이지**
    - 친구에게 애인을 신청할 수 있습니다.
    - 애인이 된 사람은 언제든 상대방의 옷장을 열어볼 수 있습니다.
    

## ****✔️ 주요 기술****

### BackEnd

- **Java 11**
- **SpringBoot 2.7.5**
- **JPA**
- **Gradle 6.9.3**
- **Python 3.8.10**

### FrontEnd

- **React 17.0.2**
- **TypeScript 4.8.4**
- **Styled-components 5.3.6**
- **Redux 4.2.0**
- **Redux-persist 6.0.0**
- **three.js** **0.146.0**
- **jwt-decode** **3.1.2**

### Infra

- **Ngnix**
- **AWS**

### AI

- **VITON-HD**
- **carvekit**

### DataBase

- **MySQL**
- **FireBase Storage**

### IDE

- **Intellij**
- **Visual Studio Code**

## 📁 파일구조

### FrontEnd

```
kkalong_fe
  ├── node_modules
  ├── public
  └── src
      ├── api
      ├── assets
      │   ├── fonts
      │   └── icons
      ├── components
      │   ├── closet
      │   ├── Community
      │   ├── ui
      │   └── User
      ├── hooks
      ├── html
      ├── pages
      │   ├── Closet
      │   ├── Community
      │   ├── Login
      │   ├── MyPage
      │   ├── Recommend
      │   ├── Signup
      │   └── VirtualFitting
      ├── Redux
      │		├── store.tsx
      │		└── modules
      └── styles
      └── common.scss
```

### BackEnd

```
KKalong_BE
├── gradle
└── src
    ├── main
    │   ├── java.com.ssafy.kkalong
    │   │    ├── api
    │   │    │    ├── controller
    │   │    │    ├── dto
    │   │    │    ├── entity
    │   │    │    ├── repository
    │   │    │    └── service
    │   │    ├── common
    │   │    ├── config
    │   │    ├── handler
    │   │    ├── jwt
    │   │    │    └── oauth
    │   │    └── security
    │   └── resources
    │        └── static
    └── test.java.com.ssafy.kkalong
```



## 참고

AI model의 용량이 너무커서 github에 업로드가 불가하고 저작권 문제로 인해서 다음주소에서 clone을 받아 사용하기를 권장합니다.

- [2D-Human-Parsing](https://github.com/fyviezhao/2D-Human-Parsing)
- [carvekit](https://github.com/OPHoperHPO/image-background-remove-tool)
- [openpose](https://github.com/CMU-Perceptual-Computing-Lab/openpose)
- [ShowMetheColor](https://github.com/starbucksdolcelatte/ShowMeTheColor)