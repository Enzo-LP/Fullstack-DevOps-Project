package com.example.fs_project_backend.controller;

import com.example.fs_project_backend.entity.UserType;
import com.example.fs_project_backend.service.UserTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-types")
@CrossOrigin(origins = "http://localhost:4200")
public class UserTypeController {

    private final UserTypeService service;

    public UserTypeController(UserTypeService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserType> getAll() {
        return service.getAll();
    }

    @PostMapping
    public UserType create(@RequestBody UserType userType) {
        return service.create(userType);
    }

    @PutMapping("/{id}")
    public UserType update(@PathVariable Integer id, @RequestBody UserType updated) {
        return service.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
