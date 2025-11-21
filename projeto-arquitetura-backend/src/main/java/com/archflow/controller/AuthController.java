package com.archflow.controller;

import com.archflow.dto.LoginRequest;
import com.archflow.dto.LoginResponse;
import com.archflow.dto.RegisterRequest;
import com.archflow.dto.UserResponse;
import com.archflow.model.User;
import com.archflow.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest registerRequest) {
        User user = authService.register(registerRequest);
        UserResponse userResponse = new UserResponse(user.getId(), user.getFullName(), user.getEmail());
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }
}
