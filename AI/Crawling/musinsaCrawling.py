import pymysql
from sqlalchemy import create_engine
import sqlalchemy
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

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

musinsa_scraping()