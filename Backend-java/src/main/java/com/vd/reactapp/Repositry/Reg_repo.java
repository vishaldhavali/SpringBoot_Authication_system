package com.vd.reactapp.Repositry;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vd.reactapp.entities.User;

public interface Reg_repo extends JpaRepository<User, Integer> {

	User findByUsername(String username);
	User findByEmail(String email);
}
