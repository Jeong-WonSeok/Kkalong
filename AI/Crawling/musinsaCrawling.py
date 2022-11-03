import pymysql
from sqlalchemy import create_engine
import sqlalchemy
import numpy as np
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

caps = DesiredCapabilities().CHROME
caps["pageLoadStrategy"] = "none"
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

def brands_scraping(brand, wd) :

    url = 'https://www.musinsa.com/brands/%s' % brand
    wd.get(url)
    lastpage = wd.find_element(By.XPATH, '//*[@id="product_list"]/div[1]/div[1]/div[2]/div[4]/span/span[1]').text
    lastpage = int(lastpage);

    for page in (1, lastpage + 1):
        page_url = 'https://www.musinsa.com/brands/%s?category3DepthCodes=&category2DepthCodes=&category1DepthCode=&colorCodes=&startPrice=&endPrice=&exclusiveYn=&includeSoldOut=&saleGoods=&timeSale=&includeKeywords=&sortCode=NEW&tags=&page=%d&size=90&listViewType=small&campaignCode=&groupSale=&outletGoods=false&boutiqueGoods=' % (brand, page)
        for i in range(1, 91):
            # try:
            wd.get(page_url)
            print(i)
            xpath = '//*[@id="searchList"]/li[%d]/div[4]/div[2]/p[2]/a' % i
            print(xpath)
            items_url = wd.find_element(By.XPATH, xpath).get_attribute('href')
            wd.get(items_url)
            print(items_url)
            text = wd.find_element(By.XPATH, '//*[@id="page_product_detail"]/div[3]/div[3]/span/em').text
            print(text)
            # except:
            #     continue

    return

def musinsa_scraping():
    wd = webdriver.Chrome('chromedriver', options=chrome_options)
    wd.implicitly_wait(3)

    url = 'https://www.musinsa.com/brands'
    brands_scraping('yale', wd)

def cody_scraping():
    wd = webdriver.Chrome('chromedriver', options=chrome_options)
    wd.implicitly_wait(3)
    codyDf = pd.DataFrame(columns={"cody_category"})
    clothesDf = pd.DataFrame(columns={"cody_id", "clothes_maincategory", "clothes_subcategorry", "brand", "color", "season", "gender",
                                        "spring", "summer", "autumn", "winter"})
    codyCategory = ["americancasual", "casual", "chic", "dandy", "formal", "girlish", "golf", "retro", "romantic", "sports", "street"]
    codyIdx = 0;
    clothesIdx = 0;
    for category in codyCategory:
        for i in range(1, 3):
            url = "https://www.musinsa.com/app/styles/lists?use_yn_360=&style_type=%s&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=%d" % (category, i)
            for j in range(1, 61):
                wd.get(url)
                wd.find_element(By.XPATH, "/html/body/div[3]/div[3]/form/div[4]/div/ul/li[%d]/div[1]/a" % j).click()
                codyDf.loc[codyIdx] = [category]
                codyIdx += 1
                for info in range(1, 11):
                    wd.find_element(By.XPATH, '//*[@id="style_info"]/div[3]/div[2]/div/div/div[1]/div[%d]/div[1]/a'%info).click()#get_attribute('href')
                    clothesMaincategory = wd.find_element(By.XPATH,'//*[@id="page_product_detail"]/div[3]/div[3]/div[1]/p/a[1]').text
                    print("main", clothesMaincategory, type(clothesMaincategory))
                    clothesSubCategory = wd.find_element(By.XPATH, '//*[@id="page_product_detail"]/div[3]/div[3]/div[1]/p/a[2]').text
                    print('sub',clothesSubCategory, type(clothesSubCategory))
                    check = wd.find_element(By.XPATH, '//*[@id="product_order_info"]/div[1]/h4').text
                    print(check)

                    if(check == "Product Info제품정보"):
                        print(1)
                        brand = wd.find_element(By.XPATH, '//*[@id="product_order_info"]/div[1]/ul/li[1]/p[2]/strong/a').text
                        print('brand', brand, type(brand))
                        try:
                            season = wd.find_element(By.XPATH, '//*[@id="product_order_info"]/div[1]/ul/li[2]/p[2]/strong').text
                        except:
                            season = np.nan
                        print('season', season, type(season))
                        gender = ""
                        # if(gen in range(1, 3))
                        # for gen in range(1, 3):
                        #     try:
                        #         gender += wd.find_element(By.XPATH, '//*[@id="product_order_info"]/div[1]/ul/li[2]/p[2]/span/span[%d]' % gen).text
                        #         gender += ' '
                        #     except:
                        #         break

                    else:
                        print(2)
                        brand = wd.find_element(By.XPATH, '//*[@id="product_order_info"]/div[2]/ul/li[1]/p[2]/strong/a').text
                        print('brand', brand ,type(brand))
                        try:
                            season = wd.find_element(By.XPATH, '//*[@id="product_order_info"]/div[2]/ul/li[2]/p[2]/strong').text
                        except:
                            season = np.nan
                        print('season', season, type(season))
                        gender = ""
                        gender += wd.find_element(By.XPATH, '//*[@id="product_order_info"]/div[2]/ul/li[2]/p[2]/span').text
                        gender += ' '

                        # for gen in range(1, 3):
                        #     try:
                        #         gender += wd.find_element(By.XPATH, '//*[@id="product_order_info"]/div[2]/ul/li[2]/p[2]/span/span[%d]'% gen).text
                        #         gender += ' '
                        #     except:
                        #         break
                        print('gender', gender, type(gender))
                    # clothesDf = pd.DataFrame(
                    #     columns={"cody_id", "clothes_maincategory", "cloth_subcategorry", "brand", "color", "season",
                    #              "gender"
                    #              "spring", "summer", "autumn", "winter"})
                    clothesDf.loc[clothesIdx] = [(codyIdx-1), clothesMaincategory, clothesSubCategory, brand, np.nan,
                                                 season, gender, np.nan, np.nan, np.nan, np.nan]
                    print(clothesDf[0:])
                    clothesIdx += 1
                    wd.back()
                    # except:
                    #     break
                print(clothesDf.tail())
            # print(codyDf.tail())

cody_scraping()
