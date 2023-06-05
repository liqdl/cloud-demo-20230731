package com.example.login.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.login.beans.TbUser;
import com.example.login.mapper.UserMapper;

@Service
public class UserService {

    @Autowired
    private UserMapper userMap;

    public TbUser login(TbUser user) {
        // System.out.println("Username" + user.getUsername());
        // System.out.println("Password" + user.getPassword());
        System.out.println("userservice:" + userMap.login(user.getUsername(), user.getPassword()));
        return userMap.login(user.getUsername(), user.getPassword());

    }
}
