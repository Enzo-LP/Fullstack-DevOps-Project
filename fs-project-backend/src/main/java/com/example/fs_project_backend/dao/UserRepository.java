package com.example.fs_project_backend.dao;

import com.example.fs_project_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
