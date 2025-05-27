package com.example.fs_project_backend.service;

import com.example.fs_project_backend.entity.UserType;

import java.util.List;

public interface UserTypeService {

    List<UserType> getAll();

    UserType create(UserType userType);

    UserType update(Integer id, UserType updated);

    void delete(Integer id);
}
