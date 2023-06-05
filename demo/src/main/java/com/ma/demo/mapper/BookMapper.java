package com.ma.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import com.ma.demo.beans.Book;

@Mapper
public interface BookMapper {
    void insertBook(long id, String name, String number, String class1, String quantity, String note);

    @Select("select * from book")
    List<Book> getBookAll();

    @Delete("delete from book where id = '${id}'")
    void deleteBook(long id);

    boolean updateBook(long id, String name, String number, String class1, String quantity, String note);

    @Select("select max(id) from book")
    long getMaxID();

    List<Book> selectByCondition(long id, String name, String number, String class1, String quantity, String note);

}
