package com.vd.reactapp.entities;
import java.sql.Timestamp;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
int id;
@Column(nullable = false)
String username;
@Column(nullable = false)
String password;
@Column(nullable = false , unique =  true)
String email;
@Column(nullable = false)
boolean isVerified = false;
@Column(name = "created_at", updatable = false, insertable = false)
private Timestamp createdAt;

public User() {
}

public User(String username, String password, String email, boolean isVerified) {
	super();
	this.username = username;
	this.password = password;
	this.email = email;
	this.isVerified = isVerified;
}
public User(String username, String password, String email) {
	super();
	this.username = username;
	this.password = password;
	this.email = email;
}



public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public boolean isVerified() {
	return isVerified;
}
public void setVerified(boolean isVerified) {
	this.isVerified = isVerified;
}
public Timestamp getCreatedAt() {
	return createdAt;
}
public void setCreatedAt(Timestamp createdAt) {
	this.createdAt = createdAt;
}

@Override
public int hashCode() {
	return Objects.hash(createdAt, email, id, isVerified, username);
}

@Override
public boolean equals(Object obj) {
	if (this == obj)
		return true;
	if (obj == null)
		return false;
	if (getClass() != obj.getClass())
		return false;
	User other = (User) obj;
	return Objects.equals(createdAt, other.createdAt) && Objects.equals(email, other.email) && id == other.id
			&& isVerified == other.isVerified && Objects.equals(username, other.username);
}

@Override
public String toString() {
	return "User [id=" + id + ", username=" + username + ", email=" + email + ", isVerified=" + isVerified
			+ ", createdAt=" + createdAt + "]";
}




}
