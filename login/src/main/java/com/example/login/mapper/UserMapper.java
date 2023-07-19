package com.example.login.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.login.beans.TbUser;

@Mapper
public interface UserMapper {

    TbUser login(String username, String password);

    TbUser getUser(String username);

    boolean insertUser(long id, String username, String password, String role);

    @Select("select max(id) from tb_user")
    long getMaxID();
}
