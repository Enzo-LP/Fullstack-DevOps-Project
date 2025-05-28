package com.example.fs_project_backend.service;

import com.example.fs_project_backend.dao.UserRepository;
import com.example.fs_project_backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public User findById(Integer id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public User update(Integer id, User updatedUser) {
        User existing = repository.findById(id).orElseThrow();
        existing.setFirstName(updatedUser.getFirstName());
        existing.setLastName(updatedUser.getLastName());
        existing.setEmail(updatedUser.getEmail());
        existing.setUserType(updatedUser.getUserType());
        return repository.save(existing);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

}
