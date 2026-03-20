package com.vd.reactapp.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vd.reactapp.Service.OtpVerification;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class Otp_verification {

	
	private OtpVerification ov;
	
	
	
	public Otp_verification(OtpVerification ov) {
		super();
		this.ov = ov;
	}


@PostMapping("/verify-email")
	public ResponseEntity<Map<String,String>> otpverify(@RequestBody Map<String,String> req) {

	    String email = req.get("email");
	    String otp = req.get("otp");

	    Map<String, String> result = ov.otpVerification(email, otp);

	    return ResponseEntity.ok(result);
	}
}
