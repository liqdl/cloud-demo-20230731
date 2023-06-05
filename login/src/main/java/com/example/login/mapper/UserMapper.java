package com.example.login.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.login.beans.TbUser;

@Mapper
public interface UserMapper {

    TbUser login(String username, String password);
}
