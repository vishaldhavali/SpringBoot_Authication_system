package com.vd.reactapp.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vd.reactapp.Repositry.UserRepo;
import com.vd.reactapp.entities.User;

@Service
public class loginService {

	UserRepo urepo;
	@Autowired
	PasswordEncoder encoder;
	
	public loginService(UserRepo urepo) {
		this.urepo = urepo;
	}
	
	public Map<String, String> loginfn(String username,String password) {
		User guser = urepo.findByUsername(username);
		Map<String, String> response = new HashMap<>();

		if (guser == null) {
			response.put("message", "User not found");
			return response;
		}

		if (!encoder.matches(password, guser.getPassword())) {
			response.put("message", "Invalid password");
			return response;
		}
		
		if (!guser.isVerified()) {
		    response.put("message", "Please verify your email first");
		    return response;
		}

		response.put("username", guser.getUsername());
		response.put("message", "Login successful");
		return response;
}
}
