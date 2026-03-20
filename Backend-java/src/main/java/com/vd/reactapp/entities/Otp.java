package com.vd.reactapp.entities;



import java.sql.Timestamp;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "otp_verification")
public class Otp {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
@Column(name = "otp_code", nullable = false)
private String otp_code;
@Column(name = "expiry_time", nullable = false)
private Timestamp expirytime;
@Column(name = "created_at", insertable = false, updatable = false)
private Timestamp createdtime;
@ManyToOne
@JoinColumn(name = "user_id", nullable = false)
private User user;

public Otp() {
}

public Otp(String otp_code, Timestamp expirytime, Timestamp createdtime, User user) {
	super();
	this.otp_code = otp_code;
	this.expirytime = expirytime;
	this.createdtime = createdtime;
	this.user = user;
}

public Otp(Long id, String otp_code, Timestamp expirytime, Timestamp createdtime, User user) {
	super();
	this.id = id;
	this.otp_code = otp_code;
	this.expirytime = expirytime;
	this.createdtime = createdtime;
	this.user = user;
}

public Otp(String otp_code, Timestamp expirytime, Timestamp createdtime) {
	super();
	this.otp_code = otp_code;
	this.expirytime = expirytime;
	this.createdtime = createdtime;
}

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getOtp_code() {
	return otp_code;
}

public void setOtp_code(String otp_code) {
	this.otp_code = otp_code;
}

public Timestamp getExpirytime() {
	return expirytime;
}

public void setExpirytime(Timestamp expirytime) {
	this.expirytime = expirytime;
}

public Timestamp getCreatedtime() {
	return createdtime;
}

public void setCreatedtime(Timestamp createdtime) {
	this.createdtime = createdtime;
}

public User getUser() {
	return user;
}

public void setUser(User user) {
	this.user = user;
}

@Override
public int hashCode() {
	return Objects.hash(createdtime, expirytime, id, otp_code, user);
}

@Override
public boolean equals(Object obj) {
	if (this == obj)
		return true;
	if (obj == null)
		return false;
	if (getClass() != obj.getClass())
		return false;
	Otp other = (Otp) obj;
	return Objects.equals(createdtime, other.createdtime) && Objects.equals(expirytime, other.expirytime)
			&& Objects.equals(id, other.id) && Objects.equals(otp_code, other.otp_code)
			&& Objects.equals(user, other.user);
}

@Override
public String toString() {
	return "Otp [id=" + id + ", otp_code=" + otp_code + ", expirytime=" + expirytime + ", createdtime=" + createdtime
			+ ", user=" + user + "]";
}




	


	
}

