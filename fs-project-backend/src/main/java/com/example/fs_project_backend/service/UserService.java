package com.example.fs_project_backend.service;

import com.example.fs_project_backend.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
    User findById(Integer id);
    User save(User user);
    User update(Integer id, User updatedUser);
    void delete(Integer id);
}
