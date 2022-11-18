package com.ssafy.kkalong.api.service;

import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayInputStream;
import java.io.InputStream;


@Service
public class FirebaseService {

    @Value("${app.firebase-bucket}")
    private String firebaseBucket;

    public String uploadClothingImgWithBackground(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create("clothing_"+id+".png", content, file.getContentType());
        } catch (Exception e){
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/clothing_"+id+".png?alt=media";
    }

    public String uploadCodyImg(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create("cody_"+id+".png", content, file.getContentType());
        } catch(Exception e) {
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/cody_"+id+".png?alt=media";
    }

    public String uploadUserProfileImg(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create("profile_"+id+".png", content, file.getContentType());
        } catch(Exception e) {
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/profile_"+id+".png?alt=media";
    }

    public String uploadPostImg(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create("post_"+id+".png", content, file.getContentType());
        } catch(Exception e) {
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/post_"+id+".png?alt=media";
    }

    public String uploadUserFaceImg(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create("face_"+id+".png", content, file.getContentType());
        } catch(Exception e) {
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/face_"+id+".png?alt=media";
    }

    public String uploadUserBodyImg(int id, MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        try{
            InputStream content = new ByteArrayInputStream(file.getBytes());
            Blob blob = bucket.create("body_"+id+".png", content, file.getContentType());
        } catch(Exception e) {
            System.out.println("ByteArrayInputStream 예외 발생");
        }
        return "https://firebasestorage.googleapis.com/v0/b/"+firebaseBucket+"/o/body_"+id+".png?alt=media";
    }
}
