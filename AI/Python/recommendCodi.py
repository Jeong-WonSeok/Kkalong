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
top_navy = ['네이비', '보라색', '데님', '파란색', '중청']
top_gray = ['라이트 그레이', '회색', '다크 그레이']
top_black = ['블랙', '흑청', '진청']

bottom_blue = ['민트', '스카이 블루', '네온 블루', '라벤더', '연청']
bottom_navy = ['네이비', '보라색', '데님', '파란색', '중청']
bottom_white = ["화이트", "아이보리", "샌드", "베이지", "페일 핑크", '라이트 그레이', '회색']
bottom_khaki = ['네온 그린', '라이트 그린', '녹색', '올리브 그린', '카키', '다크 그린', '카키 베이지',
                '라이트 옐로우', '노란색', '머스타드', '카멜', '라이트 오렌지', '네온 오렌지', '주황색', '레드 브라운']
bottom_wine = ["딥레드", "빨간색", "자주", "버건디", "갈색", "로즈 골드", "라즈베리", "네온 핑크", "분홍색", "라이트 핑크", "피치", "오렌지 핑크"]
bottom_black = ['블랙', '흑청', '다크 그레이', '진청']

shoes_blue = ['민트', '스카이 블루', '네온 블루', '라벤더', '연청']
shoes_navy = ['네이비', '보라색', '데님', '파란색', '중청']
shoes_white = ["화이트", "아이보리", "샌드", "베이지", "페일 핑크", '라이트 그레이', '회색']
shoes_khaki = ['네온 그린', '라이트 그린', '녹색', '올리브 그린', '카키', '다크 그린', '카키 베이지',
                '라이트 옐로우', '노란색', '머스타드', '카멜', '라이트 오렌지', '네온 오렌지', '주황색', '레드 브라운']
shoes_wine = ["딥레드", "빨간색", "자주", "버건디", "갈색", "로즈 골드", "라즈베리", "네온 핑크", "분홍색", "라이트 핑크", "피치", "오렌지 핑크"]
shoes_black = ['블랙', '흑청', '다크 그레이', '진청']

outer_white = ["화이트", "아이보리", "베이지", "라이트 옐로우"]
outer_brown = ["갈색", "로즈 골드", "페일 핑크", "피치", "주황색", "레드 브라운", "카멜"]
outer_green = ['올리브 그린', '카키', '다크 그린', '카키 베이지']
outer_blue = ['민트', '스카이 블루', '네온 블루', '라벤더', '연청']
outer_navy = ['네이비', '보라색', '데님', '파란색', '중청']
outer_gray = ['라이트 그레이', '회색', '다크 그레이']
outer_black = ['블랙', '흑청', '진청']

color_top = [top_white, top_black, top_blue, top_orange, top_pink, top_gray, top_navy, top_green, top_red, top_yellow]


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
    [bottom_blue, shoes_blue], [bottom_blue, shoes_black], [bottom_blue, shoes_white], [bottom_blue, shoes_navy],
    [bottom_navy, shoes_blue], [bottom_navy, shoes_black], [bottom_navy, shoes_white], [bottom_navy, shoes_navy],
    [bottom_black, shoes_black], [bottom_black, shoes_white], [bottom_black, shoes_navy],
    [bottom_khaki, shoes_khaki], [bottom_khaki, shoes_black], [bottom_khaki, shoes_white], [bottom_khaki, shoes_navy],
    [bottom_wine, shoes_wine], [bottom_wine, shoes_black], [bottom_wine, shoes_white], [bottom_wine, shoes_navy],
    [bottom_black, shoes_black], [bottom_black, shoes_white], [bottom_black, shoes_navy],
    [bottom_white, shoes_black], [bottom_white, shoes_navy], [bottom_white, shoes_white], [bottom_white, shoes_khaki],
            ]

top_outer = [
    [top_red, outer_brown], [top_red, outer_gray], [top_red, outer_white], [top_red, outer_black],
    [top_white, outer_blue], [top_white, outer_white], [top_white, outer_gray], [top_white, outer_navy], [top_white, outer_brown], [top_white, outer_black],
    [top_gray, outer_black], [top_gray, outer_white], [top_gray, outer_navy], [top_gray, outer_brown],
    [top_navy, outer_gray], [top_navy, outer_black], [top_navy, outer_white], [top_navy, outer_navy],
    [top_yellow, outer_brown], [top_yellow, outer_white],
    [top_green, outer_green], [top_green, outer_black], [top_green, outer_navy],
    [top_orange, outer_white], [top_orange, outer_black], [top_orange, outer_brown],
    [top_pink, outer_brown], [top_pink, outer_black],
    [top_blue, outer_blue], [top_blue, outer_black], [top_blue, outer_navy], [top_blue, outer_white],
    [top_black, outer_black], [top_black, outer_navy], [top_black, outer_white], [top_black, outer_brown], [top_black, outer_green], [top_black, outer_gray]
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

male_top = [1]
male_bottom = [2]
female_top = [1, 4]
female_bottom = [2, 3]

top_spring = list(set(top_12_16) | set(top_17_19) | set(top_20_22))
pants_spring = list(set(pants_12_16) | set(pants_17_19) | set(pants_20_22))
onepiece_spring = list(set(pants_12_16) | set(pants_17_19) | set(pants_20_22))
skirt_spring = list(set(skirt_12_16) | set(skirt_17_19) | set(skirt_20_22))
outer_spring = list(set(outer_12_16) | set(outer_17_19) | set(outer_20_22))
hat_spring = list(set(hat_12_16) | set(hat_17_19) | set(hat_20_22))
shoes_spring = list(set(shoes_12_16) | set(shoes_17_19) | set(shoes_20_22))

top_summer = list(set(top_23_26) | set(top_27))
pants_summer = list(set(pants_23_26) | set(pants_27))
onepiece_summer = list(set(onepiece_23_26) | set(onepiece_27))
skirt_summer = list(set(skirt_23_26) | set(skirt_27))
outer_summer = list(set(outer_23_26) | set(outer_27))
hat_summer = list(set(outer_23_26) | set(outer_27))
shoes_summer = list(set(shoes_23_26) | set(shoes_27))

top_fall = list(set(top_12_16) | set(top_17_19) | set(top_20_22))
pants_fall = list(set(pants_12_16) | set(pants_17_19) | set(pants_20_22))
onepiece_fall = list(set(pants_12_16) | set(pants_17_19) | set(pants_20_22))
skirt_fall = list(set(skirt_12_16) | set(skirt_17_19) | set(skirt_20_22))
outer_fall = list(set(outer_12_16) | set(outer_17_19) | set(outer_20_22))
hat_fall = list(set(hat_12_16) | set(hat_17_19) | set(hat_20_22))
shoes_fall = list(set(shoes_12_16) | set(shoes_17_19) | set(shoes_20_22))

top_winter = list(set(top_6_11) | set(top_5))
pants_winter = list(set(pants_6_11) | set(pants_5))
onepiece_winter = list(set(onepiece_6_11) | set(onepiece_5))
skirt_winter = list(set(skirt_6_11) | set(skirt_5))
outer_winter = list(set(outer_6_11) | set(outer_5))
hat_winter = list(set(hat_6_11) | set(hat_5))
shoes_winter = list(set(shoes_6_11) | set(shoes_5))


def set_personal_color(user_personal_color):
    personal_color = ["검정색", "흰색", "회색", "라이트 그레이", "다크 그레이",
                        "아이보리", "네이비", "데님", "연청", "중청", "진청", "흑청"]  # 무채색은 필수로 넣음

    if user_personal_color == "spring":
        personal_color.extend(["라즈베리", "페일 핑크", "코랄", "노란색", "머스타드", "금색",
                                "라이트 그린", "민트", "올리브 그린", "네온 블루", "라벤더", "갈색", "로즈 골드",
                                "레드 브라운", "카키 베이지", "카멜", "샌드", "베이지색"])
    elif user_personal_color == "summer":
        personal_color.extend(["라이트 핑크", "피치", "라이트 옐로우", "네온 그린", "민트",
                                "스카이 블루", "라벤더", "베이지색"])

    elif user_personal_color == "fall":
        personal_color.extend(["딥레드", "오렌지 핑크", "카키", "다크 그린", "자주",
                                "보라색", "다크 바이올렛", "버건디", "갈색", "로즈 골드", "레드 브라운", "카키 베이지",
                                "카멜"])
    else:
        personal_color.extend(["은색", "빨간색", "네온 핑크", "분홍색", "라이트 오렌지",
                                "네온 오렌지", "주황색", "녹색", "네온 블루", "파란색", "샌드"])

    return personal_color

import random
import pymysql
import pandas as pd
from sqlalchemy import create_engine

def importDB():
    conn = create_engine('mysql+pymysql://b302:ssafy@k7b302.p.ssafy.io:3306/kkalong')
    sql = "select * from clothing"
    result = pd.read_sql_query(sql, conn)
    return result


# 날씨 기반 추천
# 날씨, 성별, 메인 카테고리를 받아온다.
def setTopByGender(gender, df):
    cody = []
    if gender == 'M':
        cody.extend(male_top)
    else:
        for i in female_top:
            if (df['main_category'] == i).any():
                cody.append(i)
    if len(cody) == 2:
        return cody[random.choices(range(1, len(cody) + 1), weights=[len(df['main_category'] == 1)/len(df['main_category']), len(df['main_category'] == 4)/len(df['main_category'])])[0]]
    else:
        return cody[0]

def setBottomByGender(gender, top, df):
    cody = []
    if gender == 'M':
        cody.extend(male_bottom)
    else:
        for i in female_bottom:
            if (df['main_category'] == i).any():
                cody.append(i)

    if top == 4:
        return 0
    else:
        if len(cody) == 2:
            return cody[random.choices(range(1, len(cody) + 1), weights=[len(df['main_category'] == 2)/len(df['main_category']), len(df['main_category'] == 3)/len(df['main_category'])])[0] ]
        else:
            return cody[0]

def mainChoice(gender, weather, df):
    # gender 입력받고 날씨 입력받아서 출력
    top = setTopByGender(gender, df)
    bottom = setBottomByGender(gender, top, df)

    c_bag = random.choices([0, 7], weights=[0.6, 0.4])[0]
    hat = random.choices([0, 8], weights=[0.8, 0.2])[0]

    if weather == 'summer':
        outer = 0
    elif weather == 'fall' or weather == 'spring':
        outer = random.choices([0, 5], weights=[0.3, 0.7])[0]
    else:
        outer = 5

    return {"top": top, "bottom": bottom, "outer": outer, "shoes": 6, "bag": c_bag, "hat": hat}

def seasonRecommend(cody, season, df):
    top_df = set(df[df['main_category'] == 1]['sub_category'])
    bottom_df = set(df[df['main_category'] == 2]['sub_category'])
    outer_df = set(df[df['main_category'] == 5]['sub_category'])
    shoes_df = set(df[df['main_category'] == 6]['sub_category'])
    bag_df = set(df[df['main_category'] == 7]['sub_category'])
    hat_df = set(df[df['main_category'] == 8]['sub_category'])

    if season == 'spring':
        if cody['top'] == 1:
            top = top_spring
        elif cody['top'] == 4:
            top = onepiece_spring

        if cody['bottom'] == 2:
            bottom = pants_spring
        elif cody['bottom'] == 3:
            bottom = skirt_spring
        else:
            bottom = []

        if cody['outer'] != 0:
            outer = outer_spring
        else:
            outer = []
        if cody['shoes'] != 0:
            shoes = shoes_spring
        else:
            shoes = []
        if cody['bag'] != 0:
            bag_a = bag
        else:
            bag_a = []
        if cody['hat'] != 0:
            hat = hat_spring
        else:
            hat = []
    elif season == 'summer':
        if cody['top'] == 1:
            top = top_summer
        elif cody['top'] == 4:
            top = onepiece_summer

        if cody['bottom'] == 2:
            bottom = pants_summer
        elif cody['bottom'] == 3:
            bottom = skirt_summer
        else:
            bottom = []

        if cody['outer'] != 0:
            outer = outer_summer
        else:
            outer = []
        if cody['shoes'] != 0:
            shoes = shoes_summer
        else:
            shoes = []
        if cody['bag'] != 0:
            bag_a = bag
        else:
            bag_a = []
        if cody['hat'] != 0:
            hat = hat_summer
        else:
            hat = []
    elif season == 'fall':
        if cody['top'] == 1:
            top = top_fall
        elif cody['top'] == 4:
            top = onepiece_fall

        if cody['bottom'] == 2:
            bottom = pants_fall
        elif cody['bottom'] == 3:
            bottom = skirt_fall
        else:
            bottom = []

        if cody['outer'] != 0:
            outer = outer_fall
        else:
            outer = []
        if cody['shoes'] != 0:
            shoes = shoes_fall
        else:
            shoes = []
        if cody['bag'] != 0:
            bag_a = bag
        else:
            bag_a = []
        if cody['hat'] != 0:
            hat = hat_fall
        else:
            hat = []
    else:
        if cody['top'] == 1:
            top = top_winter
        elif cody['top'] == 4:
            top = onepiece_winter

        if cody['bottom'] == 2:
            bottom = pants_winter
        elif cody['bottom'] == 3:
            bottom = skirt_winter
        else:
            bottom = []

        if cody['outer'] != 0:
            outer = outer_winter
        else:
            outer = []
        if cody['shoes'] != 0:
            shoes = shoes_winter
        else:
            shoes = []
        if cody['bag'] != 0:
            bag_a = bag
        else:
            bag_a = []
        if cody['hat'] != 0:
            hat = hat_winter
        else:
            hat = []

    top_num = 0
    bottom_num = 0
    outer_num = 0
    shoes_num = 0
    bag_num = 0
    hat_num = 0

    top_and = list(set(top) & top_df)
    if len(top_and) != 0:
        top_num = random.choice(top_and)

    bottom_and = list(set(bottom) & bottom_df)
    if len(bottom_and) != 0:
        bottom_num = random.choice(bottom_and)

    outer_and = list(set(outer) & outer_df)
    if len(outer_and) != 0:
        outer_num = random.choice(outer_and)
    shoes_and = list(set(shoes) & shoes_df)
    if len(shoes_and) != 0:
        shoes_num = random.choice(shoes_and)

    bag_and = list(set(bag_a) & bag_df)
    if len(bag_and) != 0:
        bag_num = random.choice(bag_and)

    hat_and = list(set(hat) & hat_df)
    if len(hat_and) != 0:
        hat_num = random.choice(hat_and)

    return {1: top_num, 2: bottom_num, 3: 0, 4: 0, 5: outer_num, 6: shoes_num, 7: bag_num, 8: hat_num}
def temporalRecommend(cody_main, styleDf, temp):
    cody_sub = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}
    if cody_main["bag"] != 0:
        for i in range(10):
            if (styleDf['sub_category'] == random.choice(bag)).any():
                cody_sub["bag"] = random.choice(bag)
                cody_main["bag"] = 7
                break
            cody_main["bag"] = 0

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

        if cody_main["outer"] != 0:
            cody_sub[5] = random.choice(outer_20_22)
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
        if cody_main["outer"] != 0:
            cody_sub[5] = random.choice(outer_17_19)

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

        if cody_main["outer"] != 0:
            cody_sub[5] = random.choice(outer_12_16)
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

        if cody_main["outer"] != 0:
            cody_sub[5] = random.choice(outer_6_11)
        cody_sub[6] = random.choice(shoes_6_11)

        if cody_main["hat"] != 0:
            cody_sub[8] = random.choice(hat_6_11)

    else:
        if cody_main['top'] == 4:
            cody_sub[4] = random.choice(onepiece_5)
        else:
            cody_sub[1] = random.choice(top_5)

        if cody_main['bottom'] == 2:
            cody_sub[2] = random.choice(pants_5)
        elif cody_main['bottom'] == 3:
            cody_sub[3] = random.choice(skirt_5)

        if cody_main["outer"] != 0:
            cody_sub[5] = random.choice(outer_5)
        cody_sub[6] = random.choice(shoes_5)

        if cody_main["hat"] != 0:
            cody_sub[8] = random.choice(hat_5)
    return cody_sub

def weatherRecommend(style, gender, weather, temp):
    temp = int(temp)
    clothesDF = importDB()
    styleDf = clothesDF[clothesDF['style'] == style]
    #gender 입력받고 날씨 입력받아서 출력

    # {"top": 1 or 4, "bottom": 0 or 2 or 3, "outer": 0 or 5, "shoes": 6, "bag": 0 or 7, "hat": 0 or 8}
    cody_main = mainChoice(gender, weather, styleDf)
    # main_category 정해짐
    # sub_category 정하기
    # 온도에 따라

    #           상의   바지   스커트 원피스 아우터  신발   가방   모자

    color = {"top": [], "bottom": [], "outer": [], "shoes": [], "bag": [], "hat": []}

    cody_top = list(styleDf[styleDf["main_category"] == 1]['sub_category'].drop_duplicates())
    cody_bottom = list(styleDf[styleDf["main_category"] == 2]['sub_category'].drop_duplicates())
    cody_outer = list(styleDf[styleDf["main_category"] == 5]['sub_category'].drop_duplicates())
    cody_shoes = list(styleDf[styleDf["main_category"] == 6]['sub_category'].drop_duplicates())

    while(1):
        cody_sub = temporalRecommend(cody_main, styleDf, temp)
        if cody_sub[1] not in cody_top:
            continue
        if cody_sub[2] not in cody_bottom:
            continue
        if cody_sub[5] != 0 and cody_sub[5] not in cody_outer:
            continue
        if cody_sub[6] not in cody_shoes:
            continue
        break

    top_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[1]]['color'].drop_duplicates())
    bottom_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[2]]['color'].drop_duplicates())
    outer_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[5]]['color'].drop_duplicates())
    shoes_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[6]]['color'].drop_duplicates())
    bag_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[7]]['color'].drop_duplicates())
    hat_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[8]]['color'].drop_duplicates())

    total = {"top": top_color_total, "bottom": bottom_color_total, "outer": outer_color_total,
             "shoes": shoes_color_total,
             "bag": bag_color_total, "hat": hat_color_total}

    temp_top = []
    for top in color_top:
        if len(set(top) & set(top_color_total)) > 0:
            temp_top.append(list(set(top) & set(top_color_total)))
    # 상의 색 계열 지정
    color["top"] = random.choice(temp_top)
    color["bottom"] = color_select(color, bottom_color_total, "bottom", total)
    color["shoes"] = color_select(color, shoes_color_total, "shoes", total)
    color["outer"] = color_select(color, outer_color_total, "outer", total)
    color["bag"] = color_select(color, bag_color_total, "bag", total)
    color["hat"] = color_select(color, hat_color_total, "hat", total)
    top_result = selectDbCodyBySub(cody_main, color, cody_sub[1], gender, "top").sample(n=1)
    bottom_result = selectDbCodyBySub(cody_main, color, cody_sub[2], gender, "bottom").sample(n=1)
    shoes_result = selectDbCodyBySub(cody_main, color, cody_sub[6], gender, "shoes").sample(n=1)
    outer_result = selectDbCodyBySub(cody_main, color, cody_sub[5], gender, "outer")
    if len(outer_result) > 0:
        outer_result = outer_result.sample(n=1)
    bag_result = selectDbCodyBySub(cody_main, color, cody_sub[6], gender, "bag")
    if len(bag_result) > 0:
        bag_result = bag_result.sample(n=1)
    hat_result = selectDbCodyBySub(cody_main, color, cody_sub[7], gender, "hat")
    if len(hat_result) > 0:
        hat_result.sample(n=1)

    result = {"top": top_result.to_dict('r'), "bottom": bottom_result.to_dict('r'),
              "shoes": shoes_result.to_dict('r'), "outer": outer_result.to_dict('r'),
              "bag": bag_result.to_dict('r'), "hat": hat_result.to_dict('r')}
    return result

def personalRecommend(style, gender, weather ,personal_color):
    clothesDF = importDB()
    styleDf = clothesDF[clothesDF['style'] == style]

    cody = mainChoice(gender, weather, styleDf)

    cody_sub = seasonRecommend(cody, weather, styleDf)

    top_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[1]]['color'].drop_duplicates())
    bottom_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[2]]['color'].drop_duplicates())
    outer_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[5]]['color'].drop_duplicates())
    shoes_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[6]]['color'].drop_duplicates())
    bag_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[7]]['color'].drop_duplicates())
    hat_color_total = list(styleDf[styleDf["sub_category"] ==cody_sub[8]]['color'].drop_duplicates())
    personal = set_personal_color(personal_color)

    total = {"top" : top_color_total, "bottom" : bottom_color_total, "outer" : outer_color_total, "shoes" : shoes_color_total,
                "bag" : bag_color_total, "hat" : hat_color_total}

    top_total = set(personal) & set(top_color_total)

    color = {"top": [], "bottom": [], "outer": [], "shoes": [], "bag": [], "hat": []}

    temp_top = []
    for top in color_top:
        if len(set(top) & top_total) > 0:
            temp_top.append(list(set(top) & top_total))

    color["top"] = random.choice(temp_top)
    color["bottom"] = color_select(color, bottom_color_total, "bottom", total)
    color["shoes"] = color_select(color, shoes_color_total, "shoes", total)
    color["outer"] = color_select(color, outer_color_total, "outer", total)
    color["bag"] = color_select(color, bag_color_total, "bag", total)
    color["hat"] = color_select(color, hat_color_total, "hat", total)
    print(cody)
    print(color)
    print(gender)

    top_result = selectDbCody(cody, color, gender, "top").sample(n=1)
    bottom_result = selectDbCody(cody, color, gender, "bottom").sample(n=1)
    shoes_result = selectDbCody(cody, color, gender, "shoes").sample(n=1)
    outer_result = selectDbCody(cody, color, gender, "outer")
    if len(outer_result) > 0:
        outer_result = outer_result.sample(n=1)
    bag_result = selectDbCody(cody, color, gender, "bag")
    if len(bag_result) > 0:
        bag_result = bag_result.sample(n=1)
    hat_result = selectDbCody(cody, color, gender, "hat")
    if len(hat_result) > 0:
        hat_result.sample(n=1)

    result = {"top": top_result.to_dict('r'), "bottom": bottom_result.to_dict('r'),
            "shoes": shoes_result.to_dict('r'), "outer": outer_result.to_dict('r'),
            "bag": bag_result.to_dict('r'), "hat": hat_result.to_dict('r')}

    return result

def selectDbCody(cody, color, gender, category):
    conn = create_engine('mysql+pymysql://b302:ssafy@k7b302.p.ssafy.io:3306/kkalong')
    color_choice = []
    if len(color[category]) > 0:
        color_choice = random.choice(color[category])
    sql = "select * from clothing where main_category={0} and color='{1}' and (gender='{2}' or gender='B')".format(cody[category], color_choice, gender)
    result = pd.read_sql_query(sql, conn)
    return result

def selectDbCodyBySub(cody, color, sub, gender, category):
    conn = create_engine('mysql+pymysql://b302:ssafy@k7b302.p.ssafy.io:3306/kkalong')
    color_choice = []
    if len(color[category]) > 0:
        color_choice = random.choice(color[category])
    sql = "select * from clothing where main_category={0} and color='{1}' and (gender='{2}' or gender='B') and sub_category='{3}'".format(cody[category], color_choice, gender, sub)
    result = pd.read_sql_query(sql, conn)
    return result


def color_select(color, color_total, category, total):
    color_temp = []
    if category == "bottom":
        for col in top_bottom:
            if len(set(color["top"]) & set(col[0])) > 0 and len(set(col[1]) & set(total["bottom"])) > 0:
                color_temp.append(col[1])
    elif category == "outer":
        for col in top_outer:
            if len(set(color["top"]) & set(col[0])) > 0 and len(set(col[1]) & set(total["outer"])) > 0:
                color_temp.append(list(set(col[1]) & set(total["outer"])))
    elif category == "shoes":
        for col in bottom_shoes:
            if len(set(color["bottom"]) & set(col[0])) > 0 and len(set(col[1]) & set(total["shoes"])) > 0:
                color_temp.append(list(set(col[1]) & set(total["shoes"])))
    else:
        for col in top_bottom:
            if len(set(color["top"]) & set(col[0])) > 0 and len(set(total["hat"]) & set(col[1])):
                color_temp.append(list(set(total["hat"]) & set(col[1])))

    last_color = []
    for i in range(10):
        if len(color_temp) != 0:
            color_choice = random.choice(color_temp)
            last_color = list(set(color_choice) & set(color_total))

        if len(last_color) > 0:
            break

    return last_color

def bodyShapeRecommend(gender, main, season, height, weight):

    return "c"

def clothesInfoRecommend(style, gender, weather, clothes_color, main):
    clothesDF = importDB()
    styleDf = clothesDF[clothesDF['style'] == style]

    cody = mainChoice(gender, weather, styleDf)
    mainArr = [1, 2, 5, 6, 7, 8]
    checkArr = [1, 2, 5, 6, 7, 8]
    cody_sub = seasonRecommend(cody, weather, styleDf)

    top_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[1]]['color'].drop_duplicates())
    bottom_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[2]]['color'].drop_duplicates())
    outer_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[5]]['color'].drop_duplicates())
    shoes_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[6]]['color'].drop_duplicates())
    bag_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[7]]['color'].drop_duplicates())
    hat_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[8]]['color'].drop_duplicates())

    total = {"top" : top_color_total, "bottom" : bottom_color_total, "outer" : outer_color_total, "shoes" : shoes_color_total,
                "bag" : bag_color_total, "hat" : hat_color_total}

    idx = -1
    for i in mainArr:
        idx += 0
        if main != i:
            checkArr[idx] = 0
        if i == 1 and main != 1:
            print(i)
            top_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[i]]['color'].drop_duplicates())
        elif i == 2 and main != 2:
            print(i)
            bottom_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[i]]['color'].drop_duplicates())
        elif i == 5 and main != 5:
            print(i)
            outer_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[i]]['color'].drop_duplicates())
        elif i == 6 and main != 6:
            print(i)
            shoes_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[i]]['color'].drop_duplicates())
        elif i == 7 and main != 7:
            print(i)
            bag_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[i]]['color'].drop_duplicates())
        elif i == 8 and main != 8:
            print(i)
            hat_color_total = list(styleDf[styleDf["sub_category"] == cody_sub[i]]['color'].drop_duplicates())


    mainDict = {1:"top", 2:"bottom", 5:"outer", 6:"shoes", 7:"bag", 8:"hat"}
    color = { "top": [], "bottom": [], "outer": [], "shoes": [], "bag": [], "hat": [] }


    color[mainDict[main]] = [clothes_color]

    print(color[mainDict[main]])

    top_result = []
    bottom_result = []
    shoes_result = []
    outer_result = []
    bag_result = []
    hat_result = []
    print(outer_color_total)
    print(cody)
    print(cody_sub)

    for i in range(6):
        print(i)
        if i == 0 and main != 1:
            color_temp = []
            for col in top_bottom:
                if len(set(color[mainDict[main]]) & set(col[1])) > 0 and len(set(col[0]) & set(total["top"])) > 0:
                    # if col[0] in color_temp:
                    #     continue
                    color_temp.append(col[0])
            print(color_temp)
            while 1:
                last_color = list(set(random.choice(color_temp)) & set(top_color_total))
                if len(last_color) > 0:
                    break;
            color['top'] = last_color
            top_result = selectDbCody(cody, color, gender, "top").sample(n=1)
            top_result = top_result.to_dict('r')
        elif i == 1 and main != 2:
            print("bottom")
            color["bottom"] = color_select(color, bottom_color_total, "bottom", total)
            bottom_result = selectDbCody(cody, color, gender, "bottom").sample(n=1)
            bottom_result = bottom_result.to_dict('r')
        elif i == 2 and main != 6:
            print("shoes")
            color["shoes"] = color_select(color, shoes_color_total, "shoes", total)
            shoes_result = selectDbCody(cody, color, gender, "shoes").sample(n=1)
            shoes_result = shoes_result.to_dict('r')
        elif i == 3 and main != 5:
            print(color)
            color["outer"] = color_select(color, outer_color_total, "outer", total)
            outer_result = selectDbCody(cody, color, gender, "outer")
            if len(outer_result) > 0:
                outer_result = outer_result.sample(n=1)
                outer_result = outer_result.to_dict('r')
        elif i == 4 and main != 7:
            color["bag"] = color_select(color, bag_color_total, "bag", total)
            bag_result = selectDbCody(cody, color, gender, "bag")
            if len(bag_result) > 0:
                bag_result = bag_result.sample(n=1)
                bag_result = bag_result.to_dict('r')
        elif i == 5 and main != 8:
            color["hat"] = color_select(color, hat_color_total, "hat", total)
            hat_result = selectDbCody(cody, color, gender, "hat")
            if len(hat_result) > 0:
                hat_result = hat_result.sample(n=1)
                hat_result = hat_result.to_dict('r')


    result = {"top": top_result, "bottom": bottom_result,
              "shoes": shoes_result, "outer": outer_result,
              "bag": bag_result, "hat": hat_result}
    return result