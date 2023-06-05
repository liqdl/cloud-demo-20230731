package com.example.login.Controller;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.login.Service.UserService;
import com.example.login.beans.TbUser;
import com.example.login.utils.JWTUtil;

@Controller
@ResponseBody
// @CrossOrigin(origins = { "http://localhost:1000" }, allowCredentials =
// "true", allowedHeaders = {
// "X-Custom-Header" }, maxAge = 3600L, methods = { RequestMethod.GET,
// RequestMethod.POST, RequestMethod.DELETE,
// RequestMethod.HEAD })
public class IndexController {

    @Autowired
    private UserService userser;

    @PostMapping("/login/postlogin")
    public Map processBooks(TbUser user) {
        System.out.println("进入Controller");
        user = userser.login(user);
        System.out.println("取得数据:" + user);
        if (null == user) {
            return null;
        }
        // 用户存在 生成token
        // 密匙
        String secretKey = "!34ADAS";
        // 指定token过期时间为1000秒
        Long tokenExpireTime = 1000000L;
        String token = JWTUtil.generateToken(user.getUsername(), user.getRole(), secretKey, tokenExpireTime);
        System.out.println("token:" + token);
        Map map = new HashMap<>();
        map.put("token", token);
        map.put("role", user.getRole());
        return map;
    }
}
