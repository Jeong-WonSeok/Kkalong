package com.ssafy.kkalong.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
            "classpath:/static/",
            "classpath:/public/",
            "classpath:/",
            "classpath:/resources/",
            "classpath:/META-INF/resources/",
            "classpath:/META-INF/resources/webjars/"
    };

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 정적 자원의 경로를 허용
        registry.addResourceHandler("/**").addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*").allowedHeaders("*").allowedOriginPatterns("*").allowedMethods("*");
    }

}