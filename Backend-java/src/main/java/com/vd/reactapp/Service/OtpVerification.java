package com.vd.reactapp.Service;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vd.reactapp.Repositry.Otprepo;
import com.vd.reactapp.Repositry.Reg_repo;
import com.vd.reactapp.entities.Otp;
import com.vd.reactapp.entities.User;
@Service
public class OtpVerification {

	Otprepo otp_repo;
	Reg_repo reg_repo;
	
     OtpVerification() {
	}
	
     
	@Autowired
	public OtpVerification(Otprepo otp_repo, Reg_repo reg_repo) {
	
		this.otp_repo = otp_repo;
		this.reg_repo = reg_repo;
	}



	public Map<String, String> otpVerification(String email,String enteredotp) {
		Map<String, String>  response = new HashMap<>();
		User user = reg_repo.findByEmail(email);
		if(user ==  null) {
			response.put("success", "false");
		    response.put("message", "User not found");
		    return response;
		}
		Otp otp_entity = otp_repo.findByUser(user);
		if(otp_entity == null) {
			response.put("success", "false");
		    response.put("message", "Otp not found");
		    return response;
		}
		
		if(otp_entity.getExpirytime().before(new Timestamp(System.currentTimeMillis()))) {
			response.put("success", "false");
		    response.put("message", "Otp expired try Re - Regiester");
		    return response;
		}
		
		if(!otp_entity.getOtp_code().equals(enteredotp)) {
			response.put("success", "false");
		    response.put("message", "Otp Invaild");
		    return response;
		}
		
		user.setVerified(true);
		reg_repo.save(user);
		
		otp_repo.delete(otp_entity);
		
		response.put("success", "true");
	    response.put("message", "Otp verified Successfully");
	    
	    return response;
	}
	
}
