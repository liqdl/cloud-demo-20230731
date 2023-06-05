package com.ma.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ma.demo.beans.Book;
import com.ma.demo.service.BookService;

@Controller
@RequestMapping("/putStorage1")
public class PutStorageController1 {

    @Autowired
    private BookService bookSer;

    @GetMapping
    public String bookForm() {
        System.out.println("---putStorage1");
        return "putStorage1";
    }

    @PostMapping
    public String processBooks(Book book) {

        bookSer.save(book);
        return "redirect:/success";
    }
}
