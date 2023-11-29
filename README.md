![Graphic Image](https://github.com/talentforest/what-is-in-the-fridge-app/assets/91457443/f45a0c00-0d23-4f5d-9df1-4f02bf4801c5)


### 📍 프로젝트 소개
<img width="230" alt="1_Home_OnBoarding_Android" src="https://github.com/talentforest/what-is-in-the-fridge-app/assets/91457443/73f0fd2a-65cb-4d65-9fed-8fdf7ba4529b">

'냉장고에 뭐가 있지' 앱 (이하 냉뭐앱)은 곧 구글 플레이 스토어에 출시될 예정입니다.

냉뭐앱은 제가 일상속에서 계속 '오늘 뭐 해 먹지? 냉장고에 뭐가 있더라?" 라고 생각하는 것에 영감을 받아 만든 앱입니다.
앱에 대해 간단하게 소개하자면,

<strong>'실제 냉장고와 똑같이 냉장고를 커스텀해 나의 식료품들을 직관적으로 확인하고 간편하게 관리하기 위한 앱'</strong>입니다.

더 자세한 내용은 아래 프로젝트 기능에서 확인할 수 있습니다.

<br/>

### 📍 프로젝트에 사용한 스택

<div> 
  <img src="https://img.shields.io/badge/react native-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/expo-000020?style=for-the-badge&logo=expo&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/redux toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
</div>

앱을 만들기 위해 react native 와 함께 expo 환경을 선택했습니다.
  expo를 사용하여 앱을 빠르게 제작해보고 싶었기 때문에 expo 환경을 선택했는데요. 그리고 일단은 만족스러웠습니다! 일단은 다양한 설정들을 expo에서 알아서 처리해주기도 했고, 미리 만들어져 있는 create-react-native-app 템플릿을 이용하면 되었기 때문입니다.
  하지만 스토어에 배포하려고 보니 네이티브 모듈을 직접 건드려야 하는 부분이 많았는데, 이 부분을 Expo 환경에서는 어떻게 처리해야 하는지 일일이 찾아봐야했고, 또 변경하지 못하는 부분이 있어서 머리가 아팠습니다. 
  마지막으로 인앱결제기능을 구현하려고 할 때, 제대로 기기에서 테스트가 안돼서 애를 먹었네요.🥹
  또 밤에 빌드를 시작하면 빌드 시작까지 거의 한시간을 기다려야 하는 불상사가 있었습니다... 낮에 하면 그래도 거의 바로 빌드를 시작하긴 했습니다.

  그래서 expo는 expo에서 직접 권한을 제어해줘서 개발자는 바로 편리하게 코드를 짤 수 있지만, 그 권한을 제어할 수 있는게 너무나 한정적이라는 점 이 두가지가 명확하게 득과 실인 것 같습니다.
  

<br/>

### 📍 버전
  
|버전|날짜|
|------|---|
|v1.0.2|23.11.27(첫 출시)|

<br/>

### 📍 목차

> #### [1. 프로젝트 기능](###프로젝트-기능)
>
> #### [2. 프로젝트로 내가 얻은 것들](#2-프로젝트로-내가-얻은-것들)
>
> #### [3. 프로젝트 후기](#3-프로젝트-후기)
>

<br/>

### [프로젝트 기능](#목차)


* 사용자가 프로젝트를 통해 얻을 수 있는 앱의 장점


1. 냉장고를 나에게 맞게 커스텀하여 식료품들을 직관적으로 관리할 수 있습니다.
<div>
  <img height="420" width="auto" alt="1_Home_OnBoarding_Android" src="https://github.com/talentforest/what-is-in-the-fridge-app/assets/91457443/73f0fd2a-65cb-4d65-9fed-8fdf7ba4529b">
  <img height="420" width="auto" alt="7_FridgeSetting_OnBoarding_Android" src="https://github.com/talentforest/what-is-in-the-fridge-app/assets/91457443/a3a9487e-958e-43ed-9501-f49c7b71b2b5">
  <img height="420" width="auto" alt="2_Compartments_OnBoarding_Android" src="https://github.com/talentforest/what-is-in-the-fridge-app/assets/91457443/ed3497ae-6edf-47bf-a103-e1f407e5c9e6">
  <img height="420" width="auto" alt="3_FoodDetail_OnBoarding_Android" src="https://github.com/talentforest/what-is-in-the-fridge-app/assets/91457443/e2905f37-e759-45f3-b24c-faf0d11df798">
</div>

>  * 실제 나의 냉장고에 맞게 냉장실과 냉동실의 위치를 바꾸고, 내부 칸수를 조절해 커스텀을 할 수 있어서 식료품들을 실제 위치와 똑같이 추가할 수 있습니다.
>  * 또한 냉장고 내부에 들어가면 필터를 통해 소비기한이 임박한 식료품들을 한눈에 확인할 수 있습니다.
>  * 식료품에 대한 정보(소비기한, 구매날짜 등등)도 함께 입력해 간편하게 관리가 가능합니다.


<br/>

2. 단순히 냉장고에 식료품들을 추가하고 삭제하는 것이 아니라, 내가 먹을 식료품들을 쉽게 관리할 수 있도록 도와줍니다.
<div>
   <img height="420" width="auto" alt="5_ExpiredFoods_OnBoarding_Android" src="https://github.com/talentforest/what-is-in-the-fridge-app/assets/91457443/1c3b7701-977b-4759-9007-b085834e8c02">
  <img height="420" width="auto" alt="4_FavoriteFoods_OnBoarding_Android" src="https://github.com/talentforest/what-is-in-the-fridge-app/assets/91457443/021df995-2f3b-4b06-9df2-6ae79e6e016c">
  <img height="420" width="auto" alt="6_ShoppingList_OnBoarding_Android" src="https://github.com/talentforest/what-is-in-the-fridge-app/assets/91457443/827f3b40-f350-422e-8c15-f2b32441ca5b">
</div>

>  * 갖고 있는 모든 식료품 중 소비기한이 임박한 것들을 리스트로 보여주고, 이곳에서 식료품을 삭제하거나 장보기 목록에 추가할 수도 있습니다.
>      * 추가한 여러개의 식료품을 냉장고나 팬트리에 한꺼번에 추가할 수도 있습니다.
>  * '자주 먹는 식료품 목록' 스크린에서는 내가 자주 먹는 식료품들을 추가할 수 있습니다.
>      * 이 목록을 통해 현재 냉장고에 어떤 식료품이 없는지 파악할 수 있고, 없는 식료품은 바로 장보기 목록으로 추가할 수 있습니다.
>      * 식료품을 추가할 때 자주 먹는 식료품 정보가 자동으로 입력되어 보다 간편하게 추가할 수 있습니다.
>  * '장보기 목록' 스크린에서는 사용자가 장을 봐야하는 식료품들을 여러개 추가할 수 있습니다.

위의 "내가 주의해야할 식료품 / 자주 먹는 식료품 / 장봐야할 식료품" 에 대한 기능들을 제공해 식료품들을 더욱 편하게 관리할 수 있도록 도와줍니다.

<br/>

### [프로젝트로 얻은 것들](#목차)

> #### 1. 앱에 대한 공부를 시작했고, 스토어에 배포까지 해볼 수 있었습니다.

<br/>

### [프로젝트 후기](#목차)
> 원래 이 앱은 react native를 공부하기 위해 만든 프로젝트였는데요. react native 공부도 할 겸, 이왕이면 제가 재미있게 만들었던 [<냉장고에 뭐가 있지> 웹페이지 버전](https://what-is-in-the-fridge-fawn.vercel.app/my-fridge)을 앱 버전으로 만들어보고 싶어서 해당 프로젝트를 다시 앱으로 만들어보았습니다.
> 공부를 어느정도 마치고 프로젝트도 완성했는데, 그냥 놔두기는 조금 아까운 것 같아서 다시 좀 더 보완해서 스토어에 출시까지 하기로 결정했고 지금은 출시를 앞두고 있습니다. 출시가 되는대로 바로 또 업데이트하겠습니다.
> 
> 제 첫번째 앱을 스토어에 등록할 수 있어서 굉장히 벅찼습니다. 제가 만든 첫번째 앱이고, 또 직접 UI와 이미지를 디자인하고 제작해서 좀 더 애정을 갖게 된 것 같습니다.
> 개발을 진행하면서는 냉장고를 어떻게 한눈에 시각화할 수 있을지, 식료품을 어떻게 하면 좀더 간단하게 관리할 수 있을지에 대해서도 끊임없이 고민하면서 기획하고 변경하고, 또 수정하면서 앱을 개발했던 것 같습니다.
> 또한 앱에 맞춰 사용자 친화적인 UI와 UX를 제공하기 위해 끊임없이 개선할 점을 찾으려 노력했네요 :) 이 과정에서 조금 출시가 늦어졌는데, 앞으로는 출시를 하고 버전 업데이트를 통해 개선을 하자고 다짐했습니다. 




