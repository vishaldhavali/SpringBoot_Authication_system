package com.vd.reactapp.Controller;

import java.util.Map;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.vd.reactapp.DTOs.RegisterRequest;
import com.vd.reactapp.Service.RegisterService;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class RegisterController {

    private final RegisterService regSer;

    public RegisterController(RegisterService regSer) {
        this.regSer = regSer;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> SignUp(@RequestBody RegisterRequest req) {

        Map<String, String> result = regSer.Register(
                req.getUsername(),
                req.getEmail(),
                req.getPassword()
        );

        return ResponseEntity.ok(result);
    }
}