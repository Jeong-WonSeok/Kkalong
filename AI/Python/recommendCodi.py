# 상의 화이트 계열 - 연청, 진청, 베이지, 카키, 와인, 블랙
#     레드 계열 - 와인, 블랙
#     핑크 계열 - 연청, 진청, 베이지, 블랙
#     오렌지 계열 - 진청
#     옐로 계열 - 연청, 진청, 베이지, 와인
#     그린 계열 - 진청, 블랙
#     블루 계열 - 베이지, 와인, 블랙
#     네이비 계열 - 연청, 진청, 베이지, 와인
#     블랙 계열 - 진청, 베이지, 블랙
#     그레이 계열 - 블랙, 진청
top_white = ["화이트", "아이보리", "샌드", "베이지", "페일 핑크"]
top_red = ["딥레드", "빨간색", "자주", "버건디", "갈색", "로즈 골드"]
top_pink = ["라즈베리", "네온 핑크", "분홍색", "라이트 핑크", "피치", "오렌지 핑크"]
top_orange = ['라이트 오렌지', '네온 오렌지', '주황색', '레드 브라운']
top_yellow = ['라이트 옐로우', '노란색', '머스타드', '카멜']
top_green = ['네온 그린', '라이트 그린', '녹색', '올리브 그린', '카키', '다크 그린', '카키 베이지']
top_blue = ['민트', '스카이 블루', '네온 블루', '라벤더', '연청']
top_navy = ['네이비', '보라색', '데님', '파란색', '중청', '진청']
top_gray = ['라이트 그레이', '회색', '다크 그레이']
top_black = ['블랙', '흑청']

bottom_blue = ['민트', '스카이 블루', '네온 블루', '라벤더', '연청']
bottom_navy = ['네이비', '보라색', '데님', '파란색', '중청', '진청']
bottom_white = ["화이트", "아이보리", "샌드", "베이지", "페일 핑크", '라이트 그레이', '회색']
bottom_khaki = ['네온 그린', '라이트 그린', '녹색', '올리브 그린', '카키', '다크 그린', '카키 베이지',
                '라이트 옐로우', '노란색', '머스타드', '카멜', '라이트 오렌지', '네온 오렌지', '주황색', '레드 브라운']
bottom_wine = ["딥레드", "빨간색", "자주", "버건디", "갈색", "로즈 골드", "라즈베리", "네온 핑크", "분홍색", "라이트 핑크", "피치", "오렌지 핑크"]
bottom_black = ['블랙', '흑청', '다크 그레이']

shoes_blue = ['민트', '스카이 블루', '네온 블루', '라벤더', '연청']
shoes_navy = ['네이비', '보라색', '데님', '파란색', '중청', '진청']
shoes_white = ["화이트", "아이보리", "샌드", "베이지", "페일 핑크", '라이트 그레이', '회색']
shoes_khaki = ['네온 그린', '라이트 그린', '녹색', '올리브 그린', '카키', '다크 그린', '카키 베이지',
                '라이트 옐로우', '노란색', '머스타드', '카멜', '라이트 오렌지', '네온 오렌지', '주황색', '레드 브라운']
shoes_wine = ["딥레드", "빨간색", "자주", "버건디", "갈색", "로즈 골드", "라즈베리", "네온 핑크", "분홍색", "라이트 핑크", "피치", "오렌지 핑크"]
shoes_black = ['블랙', '흑청', '다크 그레이']

outer_white = ["화이트", "아이보리", "베이지", "라이트 옐로우"]
outer_brown = ["갈색", "로즈 골드", "페일 핑크", "피치", "주황색", "레드 브라운", "카멜"]
outer_green = ['올리브 그린', '카키', '다크 그린', '카키 베이지']
outer_blue = ['민트', '스카이 블루', '네온 블루', '라벤더', '연청']
outer_navy = ['네이비', '보라색', '데님', '파란색', '중청', '진청']
outer_gray = ['라이트 그레이', '회색', '다크 그레이']
outer_black = ['블랙', '흑청']

color_top = ["white", "red", "pink", "orange", "yellow", "greene", "blue", "navy", "black", "gray"]


top_bottom = [
    [top_white, bottom_blue], [top_white, bottom_navy], [top_white, bottom_white],
    [top_white, bottom_khaki], [top_white, bottom_wine], [top_white, bottom_white],
    [top_red, bottom_wine], [top_pink, bottom_blue], [top_pink, bottom_navy],
    [top_pink, bottom_white], [top_pink, bottom_black], [top_orange, bottom_navy],
    [top_yellow, bottom_blue], [top_yellow, bottom_navy], [top_yellow, bottom_white],
    [top_yellow, bottom_wine], [top_green, bottom_navy], [top_green, bottom_black],
    [top_blue, bottom_white], [top_blue, bottom_wine], [top_blue, bottom_black],
    [top_navy, bottom_blue], [top_navy, bottom_navy], [top_navy, bottom_white],
    [top_navy, bottom_wine], [top_black, bottom_navy], [top_black, bottom_white],
    [top_black, bottom_black], [top_gray, bottom_black], [top_gray, bottom_navy]
            ]

bottom_shoes = [
    [bottom_blue, shoes_blue], [bottom_black, shoes_black], [bottom_blue, shoes_white], [bottom_blue, shoes_navy],
    [bottom_navy, shoes_blue], [bottom_navy, shoes_black], [bottom_navy, shoes_white], [bottom_navy, shoes_navy],
    [bottom_black, shoes_black], [bottom_blue, shoes_white],
    [bottom_khaki, shoes_khaki], [bottom_khaki, shoes_black], [bottom_khaki, shoes_white],
    [bottom_wine, shoes_wine], [bottom_khaki, shoes_black], [bottom_khaki, shoes_white],
    [bottom_black, shoes_black], [bottom_black, shoes_white]
            ]

top_outer = [
    [top_red, outer_brown], [top_red, outer_gray], [top_red, outer_white], [top_red, outer_black],
    [top_white, outer_blue], [top_white, outer_white], [top_white, outer_gray], [top_white, outer_navy], [top_white, outer_brown], [top_white, outer_black],
    [top_gray, outer_black], [top_gray, outer_white], [top_gray, outer_navy], [top_gray, outer_brown]
    [top_navy, outer_gray], [top_navy, outer_black], [top_navy, outer_white], [top_navy, outer_navy]
    [top_yellow,]
    [top_green]
    [top_orange]
    [top_pink]
    [top_blue]
    [top_black]
]
# 날씨 매핑
bag = [701, 702, 703, 704, 705, 706, 707]
# 27 ~
top_27 = [101, 102]
onepiece_27 = [401]
pants_27 = [205]
skirt_27 = [301]
outer_27 = []
#확인 필요
shoes_27 = [605, 606, 607, 608, 609, 610, 611]
hat_27 = []

# 23 ~ 26
top_23_26 = [102, 103, 104]
onepiece_23_26 = [401, 402]
pants_23_26 = [201, 202, 203, 204, 205]
skirt_23_26 = [301, 302]
outer_23_26 = []
hat_23_26 = [801, 803, 804]
shoes_23_26 = [601, 602, 605, 606, 607, 608, 609, 610, 611]

# 20 ~ 22
top_20_22 = [102, 103, 104, 105]
onepiece_20_22 = [402, 403]
pants_20_22 = [201, 202, 203, 204, 205, ]
skirt_20_22 = [302, 303]
outer_20_22 = [501, 503, 504]
hat_20_22 = [801, 802, 803, 804]
shoes_20_22 = [601, 602, 607, 609, 610, 611]

# 17 ~19
top_17_19 = [103, 104, 105, 106, 107, 108]
onepiece_17_19 = [402, 403]
pants_17_19 = [201, 202, 203, 204, 206]
skirt_17_19 = [302, 303]
outer_17_19 = [501, 502, 503, 504]
hat_17_19 = [801, 802, 803, 804]
shoes_17_19 = [601, 602, 607, 609, 610, 611]

# 12 ~ 16
top_12_16 = [104, 105, 106, 107, 108]
onepiece_12_16 = [403]
pants_12_16 = [201, 202, 203, 204, 206]
skirt_12_16 = [303]
outer_12_16 = [501, 502, 503, 504, 505, 506, 508, 510, 512]
hat_12_16 = [801, 802, 803, 804]
shoes_12_16 = [601, 602, 607, 609, 610]

# 6~11
top_6_11 = [104, 105, 106, 107, 108]
onepiece_6_11 = [403]
pants_6_11 = [201, 202, 203, 204, 206]
skirt_6_11 = [303]
outer_6_11 = [505, 506, 507, 508, 509, 510, 512]
hat_6_11 = [801, 802, 803, 804]
shoes_6_11 = [601, 602, 603, 604, 607, 609]

# ~5
top_5 = [104, 105, 106, 107, 108]
onepiece_5 = [403]
pants_5 = [201, 202, 203, 204, 206]
skirt_5 = [303]
outer_5 = [507, 509, 511]
hat_5 = [801, 802, 803, 804]
shoes_5 = [601, 602, 603, 604, 607, 609]

male_top = [1, 5]
male_bottom = [2]
female_top = [1, 4, 5]
female_bottom = [2, 3]


# def set_personal_color(user_personal_color):
#     personal_color = ["검정색", "흰색", "회색", "라이트 그레이", "다크 그레이",
#                       "아이보리", "네이비", "데님", "연청", "중청", "진청", "흑청"]  # 무채색은 필수로 넣음
#
#     if user_personal_color == "spring":
#         personal_color.extend(["라즈베리", "페일 핑크", "코랄", "노란색", "머스타드", "금색",
#                                "라이트 그린", "민트", "올리브 그린", "네온 블루", "라벤더", "갈색", "로즈 골드",
#                                "레드 브라운", "카키 베이지", "카멜", "샌드", "베이지색"])
#     elif user_personal_color == "summer":
#         personal_color.extend(["라이트 핑크", "피치", "라이트 옐로우", "네온 그린", "민트",
#                                "스카이 블루", "라벤더", "베이지색"])
#     elif user_personal_color == "fall":
#         personal_color.extend(["딥레드", "오렌지 핑크", "카키", "다크 그린", "자주",
#                                "보라색", "다크 바이올렛", "버건디", "갈색", "로즈 골드", "레드 브라운", "카키 베이지",
#                                "카멜"])
#     else:
#         personal_color.extend(["은색", "빨간색", "네온 핑크", "분홍색", "라이트 오렌지",
#                                "네온 오렌지", "주황색", "녹색", "네온 블루", "파란색", "샌드"])
#
#     return personal_color

import random


# 날씨 기반 추천
# 날씨, 성별, 메인 카테고리를 받아온다.
def setTopByGender(gender):
    cody = []
    if gender == 'M':
        cody.extend(male_top)
    else:
        cody.extend(female_top)
    return cody[random.randrange(1, len(cody) + 1)]

def setBottomByGender(gender, top):
    cody = []
    if gender == 'M':
        cody.extend(male_bottom)
    else:
        cody.extend(female_bottom)

    if top == 4:
        return 0
    else:
        return cody[random.randrange(1, len(cody) + 1)]

def mainChoice(gender, weather):
    # gender 입력받고 날씨 입력받아서 출력
    top = setTopByGender(gender)
    bottom = setBottomByGender()
    bag = random.choice([0, 7])
    hat = random.choice([0, 8])
    if weather != 'summer':
        outer = 0
    elif weather == 'fall' or weather == 'spring':
        outer = random.choice([0, 5]);
    else:
        outer = 1

    return {"top": top, "bottom": bottom, "outer": outer, "shoes": 6, "bag": bag, "hat": hat}

def weatherRecommend(gender, weather):
    return "a"

def weatherRecommend(gender, weather, temp):
    #gender 입력받고 날씨 입력받아서 출력
    cody_main = mainChoice(gender, weather)
    # main_category 정해짐
    # sub_category 정하기
    # 온도에 따라

    #           상의   바지   스커트 원피스 아우터  신발   가방   모자
    cody_sub = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}
    if cody_main["bag"] != 0:
        cody_sub["bag"] = random.choice(bag)

    if temp >= 27:
        if cody_main['top'] == 4:
            cody_sub[4] = random.choice(onepiece_27)
        else:
            cody_sub[1] = random.choice(top_27)

        if cody_main['bottom'] == 2:
            cody_sub[2] = random.choice(pants_27)
        elif cody_main['bottom'] == 3:
            cody_sub[3] = random.choice(skirt_27)

        cody_sub[6] = random.choice(shoes_27)

        if cody_main["hat"] != 0:
            cody_sub[8] = random.choice(hat_27)

    elif 23 <= temp <= 26:
        if cody_main['top'] == 4:
            cody_sub[4] = random.choice(onepiece_23_26)
        else:
            cody_sub[1] = random.choice(top_23_26)

        if cody_main['bottom'] == 2:
            cody_sub[2] = random.choice(pants_23_26)
        elif cody_main['bottom'] == 3:
            cody_sub[3] = random.choice(skirt_23_26)

        cody_sub[6] = random.choice(shoes_23_26)

        if cody_main["hat"] != 0:
            cody_sub[8] = random.choice(hat_23_26)

    elif 20 <= temp <= 22:
        if cody_main['top'] == 4:
            cody_sub[4] = random.choice(onepiece_20_22)
        else:
            cody_sub[1] = random.choice(top_20_22)

        if cody_main['bottom'] == 2:
            cody_sub[2] = random.choice(pants_20_22)
        elif cody_main['bottom'] == 3:
            cody_sub[3] = random.choice(skirt_20_22)

        cody_sub[6] = random.choice(shoes_20_22)

        if cody_main["hat"] != 0:
            cody_sub[8] = random.choice(hat_20_22)

    elif 17 <= temp <= 19:
        if cody_main['top'] == 4:
            cody_sub[4] = random.choice(onepiece_17_19)
        else:
            cody_sub[1] = random.choice(top_17_19)

        if cody_main['bottom'] == 2:
            cody_sub[2] = random.choice(pants_17_19)
        elif cody_main['bottom'] == 3:
            cody_sub[3] = random.choice(skirt_17_19)

        cody_sub[6] = random.choice(shoes_17_19)

        if cody_main["hat"] != 0:
            cody_sub[8] = random.choice(hat_17_19)

    elif 12 <= temp <= 16:
        if cody_main['top'] == 4:
            cody_sub[4] = random.choice(onepiece_12_16)
        else:
            cody_sub[1] = random.choice(top_12_16)

        if cody_main['bottom'] == 2:
            cody_sub[2] = random.choice(pants_12_16)
        elif cody_main['bottom'] == 3:
            cody_sub[3] = random.choice(skirt_12_16)

        cody_sub[6] = random.choice(shoes_12_16)

        if cody_main["hat"] != 0:
            cody_sub[8] = random.choice(hat_12_16)

    elif 6 <= temp <= 11:
        if cody_main['top'] == 4:
            cody_sub[4] = random.choice(onepiece_6_11)
        else:
            cody_sub[1] = random.choice(top_6_11)

        if cody_main['bottom'] == 2:
            cody_sub[2] = random.choice(pants_6_11)
        elif cody_main['bottom'] == 3:
            cody_sub[3] = random.choice(skirt_6_11)

        cody_sub[6] = random.choice(shoes_6_11)

        if cody_main["hat"] != 0:
            cody_sub[8] = random.choice(hat_6_11)

    color = {"top": [], "bottom": [], "outer": [], "shoes": [], "bag": [], "hat": []}
    # 상의 색 계열 지정
    color["top"] = random.choice(color_top)
    # 하의 색 계열 지정
    bottom_color = []
    for col in top_bottom:
        if col.__contains__(color["top"]):
            bottom_color.append(col[1])
    color["bottom"] = random.choice(bottom_color)
    # 신발 색 계열 지정
    shoes_color = []
    for col in bottom_shoes:
        if col.__contains__(color["bottom"]):
            shoes_color.append((col[1]))
    color["shoes"] = random.choice(shoes_color)
    # 아우터 색 계열 지정
    outer_color = []
    for col in top_outer:
        if col.__contains__(color["bottom"]):
            outer_color.append((col[1]))
    color["outer"] = random.choice(outer_color)

    # 모자 색 지정

    return "a"

def personalRecommend(gender, main, season ,personal):

    return "b"

def bodyShapeRecommend(gender, main, season, height, weight):

    return "c"

def clothesInfoRecommend(gender, main, season, color):

    return "d"