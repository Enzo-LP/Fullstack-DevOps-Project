package com.example.fs_project_backend.dao;

import com.example.fs_project_backend.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTypeRepository extends JpaRepository<UserType, Integer> {
}
