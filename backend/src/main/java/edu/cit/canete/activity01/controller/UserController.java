package edu.cit.canete.activity01.controller;

import edu.cit.canete.activity01.model.User;
import edu.cit.canete.activity01.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public String login() {
        return "Login endpoint working";
    }

    @GetMapping("/user/{id}")
    public String getUser(@PathVariable Long id) {
        return "Getting user with ID: " + id;
    }
}