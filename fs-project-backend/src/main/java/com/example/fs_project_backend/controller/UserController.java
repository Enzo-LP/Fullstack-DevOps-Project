package com.example.fs_project_backend.controller;

import com.example.fs_project_backend.entity.User;
import com.example.fs_project_backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return service.save(user);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Integer id, @RequestBody User user) {
        return service.update(id, user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
