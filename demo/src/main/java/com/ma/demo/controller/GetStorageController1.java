package com.ma.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ma.demo.beans.Book;
import com.ma.demo.service.BookService;
import java.util.List;
import lombok.extern.slf4j.*;

@Slf4j
@Controller
@RequestMapping("/book")
@ResponseBody
// 3
// @CrossOrigin(origins = { "http://localhost:3000" }, allowCredentials =
// "true", allowedHeaders = {
// "X-Custom-Header" }, maxAge = 3600L, methods = { RequestMethod.GET,
// RequestMethod.POST, RequestMethod.DELETE,
// RequestMethod.HEAD })
public class GetStorageController1 {

    @Autowired
    private BookService bookSer;

    // @RequestMapping("/getStorage1")
    @GetMapping("/getMaxID")
    public long getMaxID() {
        System.out.println("---getMaxID");
        return bookSer.getMaxID();
    }

    // @RequestMapping("/getStorage1")
    @GetMapping("/getStorage1")
    public List<Book> getStorage1() {
        System.out.println("---getStorage1");
        log.warn("-------log-warn-------getStorage1");
        log.error("-------log-error-------getStorage1");
        log.info("-------log-info-------getStorage1");
        log.debug("-------log-debug-------getStorage1");
        return bookSer.getBook();
    }

    @GetMapping("/getStorageByCondition")
    public List<Book> getStorageByCondition(Book book) {
        System.out.println("---getStorageByCondition" + book);
        return bookSer.getBookByCondition(book);
    }

    @PostMapping("/postStorage1")
    public void processBooks(Book book) {
        System.out.println("---postStorage1" + book);
        bookSer.update(book);
        // return "success";
    }

    @PostMapping("/addBook")
    public void addBook(Book book) {
        System.out.println("---addBook:" + book);
        bookSer.save(book);
        // return "success";
    }

    @DeleteMapping("/deleteStorage1")
    public void deleteBook(long id) {
        System.out.println("---deleteStorage1");
        bookSer.delete(id);
        // return "redirect:/success";
    }

    @RequestMapping("/success")
    public String login() {
        return "success";
    }

}
