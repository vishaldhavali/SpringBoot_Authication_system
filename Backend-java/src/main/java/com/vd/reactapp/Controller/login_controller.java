package com.vd.reactapp.Controller;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vd.reactapp.Service.loginService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowCredentials = "true")
public class login_controller {

    @Value("${jwt.secret}")
    private String skkey;
    private SecretKey Sign_key;
    loginService ls;

    @PostConstruct
    public void init() {
        Sign_key = Keys.hmacShaKeyFor(skkey.getBytes());
    }

    public login_controller(loginService ls) {
        this.ls = ls;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> logincontroller(
            @RequestBody Map<String, String> req,
            HttpServletResponse res) {

        String username = req.get("username");
        String password = req.get("password");
        Map<String, String> result = ls.loginfn(username, password);

        if (result.get("username") != null) {
            String token = gentoken(username);
            ResponseCookie cookie = ResponseCookie.from("AuthID", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(3600)
                    .sameSite("Lax")   // ← fixed typo: "lex" → "Lax"
                    .build();

            res.addHeader("Set-Cookie", cookie.toString());
            return ResponseEntity.ok(result);   // ← fixed: was missing return
        }

        return ResponseEntity.status(401).body(result);
    }

    public String gentoken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(Sign_key)
                .compact();
    }
}