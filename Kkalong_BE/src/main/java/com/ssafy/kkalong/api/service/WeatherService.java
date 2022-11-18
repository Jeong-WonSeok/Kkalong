package com.ssafy.kkalong.api.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {
    public Map<String, String> loadTodayWeather(String nx, String ny, String baseDate, String baseTime, String num) throws IOException, JSONException {

        String time = baseTime.substring(0, 2) + "00";
        System.out.println("time"+time);
        Map<String, String> result = new HashMap<>();


        String apiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

        String serviceKey = "DYiaMUNcPjHkreQ50pyzW6tyOdbCv1asjoM0epV%2F4uwzon0H2yeVj6Y%2BCVJiUsoDZOtG5189mWT7bVw64VK6YA%3D%3D";

        StringBuilder urlBuilder = new StringBuilder(apiUrl);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "="+serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));	/* 타입 */
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(num, "UTF-8"));	/* 타입 */
        urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8")); //경도
        urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8")); //위도
        urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode(baseDate, "UTF-8")); /* 조회하고싶은 날짜*/
        urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode("0500", "UTF-8")); /* 조회하고싶은 시간 AM 02시부터 3시간 단위 */

        //Get방식으로 전송해서 파라미터 받아오기
        URL url = new URL(urlBuilder.toString());
        System.out.println(url);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();
        String result_json= sb.toString();
        //=======이 밑에 부터는 json에서 데이터 파싱해 오는 부분이다=====//
//        System.out.println(result_json);
        // response 키를 가지고 데이터를 파싱
        JSONObject jsonObj_1 = new JSONObject(result_json);
        JSONObject response = jsonObj_1.getJSONObject("response");

        // response 로 부터 body 찾기
//        JSONObject jsonObj_2 = new JSONObject(response);
        JSONObject body = response.getJSONObject("body");

        // body 로 부터 items 찾기
//        JSONObject jsonObj_3 = new JSONObject(body);
        JSONObject items = body.getJSONObject("items");


        // items로 부터 itemlist 를 받기
//        JSONObject jsonObj_4 = new JSONObject(items);
//        System.out.println(items.toString());
        JSONArray jsonArray = items.getJSONArray("item");

        for(int i=0;i<jsonArray.length();i++){
            JSONObject jsonObj_4 = jsonArray.getJSONObject(i);
            String fcstValue = jsonObj_4.getString("fcstValue");
            String category = jsonObj_4.getString("category");
            String fcstTime = jsonObj_4.getString("fcstTime");
            String fcstDate = jsonObj_4.getString("fcstDate");

            if(category.equals("SKY") && fcstTime.equals(time)){
                if(fcstValue.equals("1")) {
                    result.put(fcstDate+" 날씨", "맑음");
                }else if(fcstValue.equals("2")) {
                    result.put(fcstDate+" 날씨", "비");
                }else if(fcstValue.equals("3")) {
                    result.put(fcstDate+" 날씨", "구름");
                }else if(fcstValue.equals("4")) {
                    result.put(fcstDate+" 날씨", "흐림");
                }
            }

            if(category.equals("TMP") || fcstTime.equals(time)){
                result.put(fcstDate, fcstValue);
            }

        }

        return result;
    }

}
