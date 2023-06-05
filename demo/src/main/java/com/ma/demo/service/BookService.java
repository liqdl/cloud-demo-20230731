package com.ma.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ma.demo.beans.Book;
import com.ma.demo.mapper.BookMapper;

@Service
public class BookService {

    @Autowired
    private BookMapper bookMap;

    public void save(Book book) {

        book.setId(getMaxID() + 1);
        System.out.println("---追加开始" + book);
        bookMap.insertBook(book.getId(), book.getName(), book.getNumber(), book.getClass1(), book.getQuantity(),
                book.getNote());
        System.out.println("---追加结束" + book);
    }

    public void update(Book book) {
        System.out.println("---修改开始" + book);
        bookMap.updateBook(book.getId(), book.getName(), book.getNumber(), book.getClass1(), book.getQuantity(),
                book.getNote());
        System.out.println("---修改结束" + book);
    }

    public void delete(long id) {
        System.out.println("---删除开始" + id);
        bookMap.deleteBook(id);
        System.out.println("---删除结束" + id);
    }

    public List<Book> getBook() {
        return bookMap.getBookAll();
    }

    public List<Book> getBookByCondition(Book book) {
        System.out.println("---按条件查询" + book);
        return bookMap.selectByCondition(book.getId(), book.getName(), book.getNumber(), book.getClass1(),
                book.getQuantity(),
                book.getNote());
    }

    public long getMaxID() {
        return bookMap.getMaxID();
    }
}
