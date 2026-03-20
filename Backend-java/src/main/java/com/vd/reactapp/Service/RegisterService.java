package com.vd.reactapp.Service;

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.util.HashMap;

import java.util.Map;



import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.vd.reactapp.Repositry.Otprepo;
import com.vd.reactapp.Repositry.Reg_repo;
import com.vd.reactapp.entities.Otp;
import com.vd.reactapp.entities.User;
@Service
public class RegisterService {

    private final Otprepo otp_repo;
private final EmailService ems;
    private final Reg_repo regrepo;
    private final BCryptPasswordEncoder passwordEncoder;

    

    public RegisterService(Otprepo otp_repo, Reg_repo regrepo, BCryptPasswordEncoder passwordEncoder, EmailService ems) {
		super();
		this.ems = ems;
		this.otp_repo = otp_repo;
		this.regrepo = regrepo;
		this.passwordEncoder = passwordEncoder;
	}



	public Map<String, String> Register(String username, String email, String password) {

        Map<String, String> response = new HashMap<>();

        User exuser = regrepo.findByEmail(email);

        if (exuser != null) {
            response.put("success", "false");
            response.put("message", "Email already exists");
            return response;
        }

        String hashedpassword = passwordEncoder.encode(password);

        User newuser = new User();
        newuser.setUsername(username);
        newuser.setEmail(email);
        newuser.setPassword(hashedpassword);
        newuser.setVerified(false);

        	SecureRandom SR = new SecureRandom();
      	int otp =  SR.nextInt(100000,999999);
     	String sotp = String.valueOf(otp);
     	Otp uotp = new Otp();
     	uotp.setUser(newuser);
     	uotp.setOtp_code(sotp);
     	uotp.setExpirytime(new Timestamp(System.currentTimeMillis() + 5 *60*1000));
        regrepo.save(newuser);
        otp_repo.save(uotp);
        response.put("success", "true");
        response.put("message", "User registered successfully");
        ems.sendotp(email, sotp);

        return response;
    }
}
