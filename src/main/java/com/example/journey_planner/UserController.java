package com.example.journey_planner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3002"})
public class UserController {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("Signup successful");
    }

   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {
    User existingUser = userRepository.findByEmail(user.getEmail());
    if (existingUser == null || !passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    String token = JwtUtil.generateToken(existingUser.getEmail());

    return ResponseEntity.ok().body(Map.of(
        "message", "Login successful",
        "token", token
    ));
}

}
