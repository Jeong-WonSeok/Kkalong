package com.ssafy.kkalong.api.service;


import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FirebaseService {
    @Value("${app.firebase-bucket}")
    private String firebaseBucket;

    public String uploadClothingImgWithBackground(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create("user_"+id+"_clothing_bg", content, file.getContentType());
        } catch (Exception e){
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/user_"+id+"+_clothing_bg?alt=media";
    }

    public String uploadClothingImgWithoutBackground(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create("clothing_rmbg_"+id, content, file.getContentType());
        } catch(Exception e) {
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/clothing_bg_"+id+"?alt=media";

    }

    public String uploadCodyImg(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create("cody_"+id, content, file.getContentType());
        } catch(Exception e) {
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/cody_"+id+"?alt=media";
    }
}
