"""
 - fast api 설치
pip install fastapi
pip install uvicorn

서버 실행 명령어 ->
uvicorn main:app --reload
"""

# from typing import Optional
# from fastapi import FastAPI
# import removeBg
# app = FastAPI()
#
# @app.get("/api/removeBg/{imgUrl}")
# def removeBackground(imgUrl: Optional[str] =None):
#     result = removeBg.remove("https://firebasestorage.googleapis.com/v0/b/kkalong-b4cec.appspot.com/o/-1_ducky_313%40naver.com?alt=media")
#     return str(result)


# @app.get("/api/keyword/{keyword}")
# def read_keyword(keyword: Optional[str] = None):
#     text = spellCheck.spellCehck_Busan(keyword)
#     keyword = spellCheck.keyword_analysis(text)
#     result = " ".join(keyword)
#
#     return str(result)



