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

    public TbUser getUser(TbUser user) {

        System.out.println("---user.getUsername():" + user.getUsername());

        return userMap.getUser(user.getUsername());

    }

    public boolean save(TbUser user) {

        user.setId(getMaxID() + 1);
        System.out.println("---追加开始" + user);
        boolean flag = userMap.insertUser(user.getId(), user.getUsername(), user.getPassword(), user.getRole());
        System.out.println("---追加结束" + user);
        return flag;
    }

    public long getMaxID() {
        return userMap.getMaxID();
    }
}
