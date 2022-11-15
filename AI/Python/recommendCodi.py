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

top_bottom = [
                [top_white, bottom_blue], [top_white, bottom_navy], [top_white, bottom_white],
                [top_white, bottom_khaki], [top_white, bottom_wine], [top_white, bottom_white],
                [top_red, bottom_wine], [top_pink, bottom_blue], [top_pink, bottom_navy],
                [top_pink, bottom_white], [top_pink, bottom_black], [top_orange, bottom_navy],
                [top_yellow, bottom_blue], [top_yellow, bottom_navy], [top_yellow, bottom_white],
                [top_yellow, bottom_wine], [top_green, bottom_navy], [top_green, bottom_black],
                [top_blue, bottom_white], [top_blue, bottom_wine ], [top_blue, bottom_black],
                [top_navy, bottom_blue], [top_navy, bottom_navy], [top_navy, bottom_white],
                [top_navy, bottom_wine], [top_black, bottom_navy], [top_black, bottom_white],
                [top_black, bottom_black], [top_gray, bottom_black], [top_gray, bottom_navy]
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
shoes_27 = [606, 607, 608, 609, 610]
hat_27 = []

# 23 ~ 26
top_23_26 = [102, 103, 104]
onepiece_23_26 = [401, 402]
pant_23_26 = [201, 202, 203, 204, 205]
skirt_23_26 = [301, 302]
outer_23_26 = []
hat_23_26 = [801, 803, 804]

# 20 ~ 22
top_20_22 = [102, 103, 104, 105]
onepiece_20_22 = [402, 403]
pants_20_22 = [201, 202, 203, 204, 205, ]
skirt_20_22 = [302, 303]
outer_20_22 = [501, 503, 504]
hat_20_22 = [801, 802, 803, 804]

# 17 ~19
top_17_19 = [103, 104, 105, 106, 107, 108]
onepiece_17_19 = [402, 403]
pants_17_19 = [201, 202, 203, 204, 206]
skirt_17_19 = [302, 303]
outer_17_19 = [501, 502, 503, 504]
hat_17_19 = [801, 802, 803, 804]

# 12 ~ 16
top_12_16 = [104, 105, 106, 107, 108]
onepiece_12_16 = [403]
pants_12_16 = [201, 202, 203, 204, 206]
skirt_12_16 = [303]
outer_12_16 = [501, 502, 503, 504, 505, 506, 508, 510, 512]
hat_12_16 = [801, 802, 803, 804]

# 6~11
top_6_11 = [104, 105, 106, 107, 108]
onepiece_6_11 = [403]
pants_6_11 = [201, 202, 203, 204, 206]
skirt_6_11 = [303]
outer_6_11 = [505, 506, 507, 508, 509, 510, 512]
hat_6_11 = [801, 802, 803, 804]

# ~5
top_5 = [104, 105, 106, 107, 108]
onepiece_5 = [403]
pants_5 = [201, 202, 203, 204, 206]
skirt_5 = [303]
outer_5 = [507, 509, 511]
hat_5 = [801, 802, 803, 804]







# 날씨 기반 추천
# 날씨, 성별, 메인 카테고리를 받아온다.
def weatherRecommend(gender, weather):

    return "a"

def personalRecommend(gender, main, season ,personal):

    return "b"

def bodyShapeRecommend(gender, main, season, height, weight):

    return "c"

def clothesInfoRecommend(gender, main, season, color):

    return "d"