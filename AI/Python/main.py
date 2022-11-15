"""
 - fast api 설치
pip install fastapi
pip install uvicorn

서버 실행 명령어 ->
uvicorn main:app --reload
"""

from typing import Optional
from fastapi import FastAPI
import os
import pyrebase
import removeBg
import personalColor

app = FastAPI()

config = {
    "apiKey": "AIzaSyA-HIC901h-tMYrEOiMgv4fKau6bkoCQjs",
    "authDomain": "kkalong-b4cec.firebaseapp.com",
    "projectId": "kkalong-b4cec",
    "databaseURL": "gs://kkalong-b4cec.appspot.com",
    "storageBucket": "kkalong-b4cec.appspot.com",
    "messagingSenderId": "926796121811",
    "appId": "1:926796121811:web:7d5ef2a7e8e5f0c3f73626",
    "measurementId": "G-TZ3DZ6YPBC",
    "serviceAccount": "serviceAccountKey.json"
}

firebase_storage = pyrebase.initialize_app(config)
storage = firebase_storage.storage()

@app.get("/api/remove_clothing_bg/{clothing_id}")
def remove_clothing_background(clothing_id: Optional[str]=None):
    storage.child("").download("clothing_"+clothing_id, "clothing_with_background.png")
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
    storage.child("").download("clothing_"+clothing_id, "clothing_extract_color.png")
    


@app.get("/api/personal_color/{profile_img}")
def personal_color_info(profile_img: Optional[str] = None):
    result = personalColor.personal_color(profile_img)
    return str(result)
