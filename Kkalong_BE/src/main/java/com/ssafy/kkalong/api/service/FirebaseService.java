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

    public String uploadImageWithBackground(int id, String email,  MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create(id+"_"+email, content, file.getContentType());
        } catch (Exception e){
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/"+id+"_"+email+"?alt=media";
    }

    public String uploadClothingImgWithoutBackground(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create(id+"", content, file.getContentType());
        } catch(Exception e) {
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/clothing%2F"+id+"?alt=media";

    }
}
