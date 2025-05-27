package com.example.fs_project_backend.service;

import com.example.fs_project_backend.dao.UserRepository;
import com.example.fs_project_backend.dao.UserTypeRepository;
import com.example.fs_project_backend.entity.UserType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTypeServiceImpl implements UserTypeService {

    private final UserTypeRepository repository;

    public UserTypeServiceImpl(UserTypeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<UserType> getAll() {
        return repository.findAll();
    }

    @Override
    public UserType create(UserType userType) {
        return repository.save(userType);
    }

    @Override
    public UserType update(Integer id, UserType updated) {
        UserType existing = repository.findById(id).orElseThrow();
        existing.setTypeName(updated.getTypeName());
        return repository.save(existing);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
