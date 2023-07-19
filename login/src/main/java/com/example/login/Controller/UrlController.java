package com.example.login.Controller;

import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestMethod;

@Controller

// @CrossOrigin(origins = { "http://localhost:1000" }, allowCredentials =
// "true", allowedHeaders = {
// "X-Custom-Header" }, maxAge = 3600L, methods = { RequestMethod.GET,
// RequestMethod.POST, RequestMethod.DELETE,
// RequestMethod.HEAD })
public class UrlController {

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/login/register")
    public String register() {
        return "register";
    }

}
