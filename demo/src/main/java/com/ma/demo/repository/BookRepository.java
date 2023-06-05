package com.ma.demo.repository;

import org.springframework.data.repository.CrudRepository;

import com.ma.demo.beans.Book;

public interface BookRepository extends CrudRepository<Book, Long> {
    
}
