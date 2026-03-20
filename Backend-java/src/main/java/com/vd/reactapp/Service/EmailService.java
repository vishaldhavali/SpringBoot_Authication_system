package com.vd.reactapp.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailService {

	@Autowired
	private JavaMailSender jms;
	
	public EmailService() {
	}
	public void sendotp(String mail,String otp) {
		
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom("scam2023b@gmail.com"); 
		msg.setTo(mail);
		msg.setSubject("OTP code for Vcode Acedmey ");
		msg.setText("Hello welcome to the Vcode Acedmey and your Otp is : " + otp );
	    jms.send(msg);
	}
	
	
	
	
	
}
