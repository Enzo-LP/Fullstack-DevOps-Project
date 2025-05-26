package com.example.fs_project_backend.service;

import com.example.fs_project_backend.dao.UserTypeRepository;
import com.example.fs_project_backend.entity.UserType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTypeServiceImpl implements UserTypeService {

    private UserTypeRepository repo;

    public void UserTypeService(UserTypeRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<UserType> getAll() {
        return repo.findAll();
    }

    @Override
    public UserType create(UserType userType) {
        return repo.save(userType);
    }

    @Override
    public UserType update(Long id, UserType updated) {
        UserType existing = repo.findById(id).orElseThrow();
        existing.setTypeName(updated.getTypeName());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
