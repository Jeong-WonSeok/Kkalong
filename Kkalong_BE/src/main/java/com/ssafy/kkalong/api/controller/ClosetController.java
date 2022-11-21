package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.*;
import com.ssafy.kkalong.api.service.ClosetService;
import com.ssafy.kkalong.api.service.FirebaseService;
import com.ssafy.kkalong.api.service.UserService;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;


@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/closet")
public class ClosetController {

    private final ClosetService closetService;
    private final UserService userService;
    private final FirebaseService firebaseService;

    @GetMapping("/all/{user_id}")
    public ResponseEntity<?> getAllClosetByUserId(@PathVariable int user_id){
        Map<String, Object> result = new HashMap<>();
        User user = userService.getUserByUserId(user_id);
        List<ClosetInfoDto> closetInfoDtos = new ArrayList<>();
        List<Closet> closets = closetService.getClosetsByUserId(user);
        for (Closet closet : closets) {
            ClosetInfoDto closetInfoDto = ClosetInfoDto.builder()
                    .closet_id(closet.getId())
                    .name(closet.getName())
                    .clothings(closetService.findAllClothingByCloset(closet))
                    .codies(closetService.findAllCodybyCloset(closet))
                    .build();
            closetInfoDtos.add(closetInfoDto);
        }
        result.put("closets", closetInfoDtos);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/closet")
    public ResponseEntity<?> registerCloset(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody StringDto stringDto) throws Exception {
        Map<String, Object> result = new HashMap<>();
        result.put("closet_id", closetService.registerCloset(userInfo.getId(), stringDto.getValue()));
        return ResponseEntity.ok().body(result);
    }

//    @GetMapping("/closet/{closet_id}")
//    public Object getClothingImages(HttpServletRequest request, HttpServletResponse response, @PathVariable int closet_id) throws Exception {
//
//        FileInputStream fis = null;
//        BufferedInputStream bis = null;
//        ServletOutputStream sos = null;
//        File file = null;
//
//        Closet closet = closetService.getClosetsByClosetId(closet_id);
//        List<ClothingDto> clothings = closetService.findAllClothingByCloset(closet);
//        if(clothings != null) {
//            String[] s1 = new String[2];
//            String[] s2 = new String[2];
//            for(ClothingDto clothingDto : clothings){
//                String clothing_img_url = clothingDto.getImg();
//                s1 = clothing_img_url.split("\\?");
//                s2 = s1[0].split("/o/");
//                System.out.println(s2[1]);
//                URI url = URI.create(clothing_img_url);
//                // 원격 파일 다운로드
//                RestTemplate           rt     = new RestTemplate();
//                ResponseEntity<byte[]> res    = rt.getForEntity(url, byte[].class);
//                byte[]                 buffer = res.getBody();
//
//                // 로컬 서버에 저장
////            String fileName = UUID.randomUUID().toString();                    // 파일명 (랜덤생성)
//                String fileName = s2[1];                    // 파일명 (랜덤생성)
//                String ext = "." + StringUtils.getFilenameExtension(clothing_img_url); // 확장자 추출
////                URL r = this.getClass().getResource("");
////                String path = r.getPath();
////                Path target = Paths.get(path+fileName );    // 파일 저장 경로
//                URI uri = ClassLoader.getSystemResource("").toURI();
//                String mainPath = Paths.get(uri).toString();
//                Path target = Paths.get(mainPath ,fileName);
//
//                try {
//                    FileCopyUtils.copy(buffer, target.toFile());
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//
//                try {
//                    file = new File(String.valueOf(target));
//
//                    fis = new FileInputStream(file);
//                    bis = new BufferedInputStream(fis);
//                    sos = response.getOutputStream();
//
//                    String reFilename = "";
//                    // IE로 실행한 경우인지 -> IE는 따로 인코딩 작업을 거쳐야 한다. request헤어에 MSIE 또는 Trident가 포함되어 있는지 확인
//                    boolean isMSIE = request.getHeader("user-agent").indexOf("MSIE") != -1 || request.getHeader("user-agent").indexOf("Trident") != -1;
//
//                    if(isMSIE) {
//                        reFilename = URLEncoder.encode(fileName, "utf-8");
//                        reFilename = reFilename.replaceAll("\\+", "%20");
//                    }
//                    else {
//                        reFilename = new String(fileName.getBytes("utf-8"), "ISO-8859-1");
//                    }
//
//                    response.setContentType("application/octet-stream;charset=utf-8");
//                    response.addHeader("Content-Disposition", "attachment;filename=\""+reFilename+"\"");
//                    response.setContentLength((int)file.length());
//
//                    int read = 0;
//                    while((read = bis.read()) != -1) {
//                        sos.write(read);
//                    }
//
//                } catch (FileNotFoundException e) {
//                    e.printStackTrace();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//        return ResponseEntity.ok();
//    }

    @PostMapping(consumes = {"multipart/form-data"}, value = "/removeBg")
    public ResponseEntity<?> removeClothingImgBackground(@RequestPart MultipartFile img) {
        System.out.println("img file name:"+img.getOriginalFilename());
        System.out.println("img content type:"+img.getContentType());
        Map<String, Object> result = new HashMap<>();
        int next_clothing_id = closetService.findNextClothingId();
        System.out.println(next_clothing_id);
//        String img_url = closetService.removeClothingImgBackground(next_clothing_id, img);
//        img_url = img_url.substring(1, img_url.length()-1);
//        String color = closetService.getColorInfos(next_clothing_id);
//        color = color.substring(1, color.length()-1);
        String mainCategory = closetService.getCategoryInfos(next_clothing_id);
        mainCategory = mainCategory.substring(1, mainCategory.length()-1);
//        result.put("img", img_url);
//        result.put("color", color);
        result.put("mainCategory", Integer.parseInt(mainCategory));
        return ResponseEntity.ok().body(result);
    }

    @PostMapping(value = "/clothing")
    public ResponseEntity<?> registerClothing(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody ClothingDto clothingDto){
        Map<String, Object> result = new HashMap<>();
        Clothing clothing = closetService.registerClothing(userInfo.getId(), clothingDto);
        result.put("clothing_id", clothing.getId());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/clothing/{clothing_id}")
    public ResponseEntity<?> getClothingInfoByClothingId(@PathVariable int clothing_id){
        Map<String, Object> result = new HashMap<>();
        ClothingInfoResponseDto clothingInfoResponseDto = closetService.getClothingInfoByClothingId(clothing_id);
        result.put("clothing", clothingInfoResponseDto);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/clothings/{closet_id}")
    public ResponseEntity<?> getClothingsByClosetId(@PathVariable int closet_id){
        Map<String, Object> result = new HashMap<>();
        Closet closet = closetService.getClosetsByClosetId(closet_id);
        result.put("clothings", closetService.findAllClothingByCloset(closet));
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/codies/{closet_id}")
    public ResponseEntity<?> getCodiesByClosetId(@PathVariable int closet_id){
        Map<String, Object> result = new HashMap<>();
        Closet closet = closetService.getClosetsByClosetId(closet_id);
        result.put("codies", closetService.findAllCodybyCloset(closet));
        return ResponseEntity.ok().body(result);
    }

    @PostMapping(consumes = {"multipart/form-data"}, value = "/cody/img")
    public ResponseEntity<?> saveCodyImg(@RequestPart MultipartFile cody_img){
        Map<String, Object> result = new HashMap<>();
        int next_cody_id = closetService.findNextCodyId();
        String cody_img_url = firebaseService.uploadCodyImg(next_cody_id, cody_img);
        result.put("img", cody_img_url);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/cody")
    public ResponseEntity<?> registerCody(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody CodyDto codyDto){
        Map<String, Object> result = new HashMap<>();
        Cody cody = closetService.registerCody(userInfo.getId(), codyDto);
        result.put("cody_id", cody.getId());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/cody/{cody_id}")
    public ResponseEntity<?> getCodyInfoByCodyId(@PathVariable int cody_id){
        Map<String, Object> result = new HashMap<>();
        Cody cody = closetService.getCodyInfoByCodyId(cody_id);
        CodyInfoResponseDto codyInfoResponseDto = CodyInfoResponseDto.builder()
                .cody_id(cody.getId())
                .img(cody.getImg())
                .name(cody.getName())
                .open(cody.getOpen())
                .style(cody.getStyle())
                .season(closetService.getStringSeasonsfromCody(cody))
                .build();
        result.put("cody", codyInfoResponseDto);
        List<CodyClothing> codyClothings = closetService.findAllCodyClothingByCody(cody);
        ArrayList<ClothingInfoResponseDto> clothingInfoResponseDtos = new ArrayList<>();
        for (CodyClothing codyClothing: codyClothings) {
            ClothingInfoResponseDto clothingInfoResponseDto = closetService.getClothingInfoByClothingId(codyClothing.getClothing().getId());
            clothingInfoResponseDtos.add(clothingInfoResponseDto);
        }
        result.put("clothings", clothingInfoResponseDtos);
        return ResponseEntity.ok().body(result);
    }
}
