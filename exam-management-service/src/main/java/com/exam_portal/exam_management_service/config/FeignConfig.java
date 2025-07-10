package com.exam_portal.exam_management_service.config;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return template -> {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                String auth = attributes.getRequest().getHeader("Authorization");
                System.out.println("Feign Forwarding Authorization: " + auth);
                if (auth != null) template.header("Authorization", auth);
            }
        };
    }
}
