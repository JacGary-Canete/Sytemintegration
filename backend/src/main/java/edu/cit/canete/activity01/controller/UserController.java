package edu.cit.canete.activity01.controller;

import edu.cit.canete.activity01.model.User;
import edu.cit.canete.activity01.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) {
        Optional<User> foundUser = userRepository.findByUsername(loginRequest.getUsername());

        if (foundUser.isEmpty()) {
            return "User not found";
        }

        User user = foundUser.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return "Invalid password";
        }

        return "Login successful";
    }

    @GetMapping("/user/{id}")
    public String getUser(@PathVariable Long id) {
        return "Getting user with ID: " + id;
    }
}