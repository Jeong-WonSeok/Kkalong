from typing import Optional
from fastapi import FastAPI
import os
import sys
import pyrebase
from PIL import Image
from fastapi.encoders import jsonable_encoder

import removeBg
import colorExtract
import recommendCodi
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

from ShowMeTheColor.src import personal

app = FastAPI()

config = {
    "apiKey": "AIzaSyA-HIC901h-tMYrEOiMgv4fKau6bkoCQjs",
    "authDomain": "kkalong-b4cec.firebaseapp.com",
    "projectId": "kkalong-b4cec",
    "storageBucket": "kkalong-b4cec.appspot.com",
    "databaseURL": "gs://kkalong-b4cec.appspot.com",
    "messagingSenderId": "926796121811",
    "appId": "1:926796121811:web:7d5ef2a7e8e5f0c3f73626",
    "measurementId": "G-TZ3DZ6YPBC",
    "serviceAccount": "serviceAccountKey.json"
}

firebase_storage = pyrebase.initialize_app(config)
storage = firebase_storage.storage()

@app.get("/api/remove_clothing_bg/{clothing_id}")
def remove_clothing_background(clothing_id: Optional[str]=None):
    storage.child("").download("clothing_"+clothing_id+".png", "clothing_with_background.png")
    print("finished downloading file")
    result = removeBg.remove_clothing_background(clothing_id)
    print("finished removing background")
    storage.child(result).put(result)
    print("finished uploading file")
    os.remove('clothing_with_background.png')
    os.remove(result)
    print("finished deleting file")
    return "https://firebasestorage.googleapis.com/v0/b/kkalong-b4cec.appspot.com/o/"+result+"?alt=media"

@app.get("/api/clothing_color/{clothing_id}")
def extract_clothing_color(clothing_id: Optional[str] =None):
    storage.child("").download("clothing_"+clothing_id+".png", "clothing_extract_color.png")
    result = colorExtract.image_preprocess("clothing_extract_color.png")
    os.remove('clothing_extract_color.png')
    return str(result)

@app.get("/api/personal_color/{user_id}")
def personal_color_info(user_id: Optional[str] = None):
    storage.child("").download("face_"+user_id+".png", "face_img.png")

    result = personal.personalColor("face_img.png")
    os.remove('face_img.png')
    return str(result.split('(')[-1].split(')')[0])

@app.get("/api/personal_recommend/{personal_color}/{season}/{gender}/{style}")
def personal_recommend(personal_color: Optional[str] = None, season: Optional[str] = None,
                        gender: Optional[str] = None, style: Optional[str] = None):

    print(personal_color, season, gender, style)
    result_arr = []
    idx = 0
    for i in range(4):
        while 1:
            try:
                if idx >= 99:
                    result_arr.append("코디가 없어요..ㅠ")
                    return result_arr
                result = recommendCodi.personalRecommend(style, gender, season, personal_color)
                result_arr.append(result)
                break
            except:
                idx += 1
                continue
    return result_arr

@app.get("/api/weather_recommend/{style}/{season}/{gender}/{temp}")
def personal_recommend(style: Optional[str] = None, season: Optional[str] = None,
                        gender: Optional[str] = None, temp: Optional[str] = None):

    print(style, season, gender, temp)
    result_arr = []
    idx = 0
    while 1:
        try:
            if idx >= 99:
                result_arr.append("코디가 없어요..ㅠ")
                return result_arr
    #             print(idx)
            result = recommendCodi.weatherRecommend(style, gender, season, temp)
            result_arr.append(result)
            break
        except:
            idx += 1
            #     continue
    return result

@app.get("/api/clothesInfo_recommend/{style}/{season}/{gender}/{color}/{main}")
def clothesInfo_recommend(style: Optional[str] = None, season: Optional[str] = None,
                        gender: Optional[str] = None, color: Optional[str] = None,
                        main: Optional[str] = None):
    print(style, season, gender, color, main)
    result_arr = []
    idx = 0
    for i in range(4):
        while 1:
            try:
                if idx >= 100:
                    result_arr.append("코디가 없어요..ㅠ")
                    return result_arr
                print(idx)
                result = recommendCodi.clothesInfoRecommend(style, gender, season, color, main)
                result_arr.append(result)
                break
            except:
                idx += 1
                continue
    return result_arr




