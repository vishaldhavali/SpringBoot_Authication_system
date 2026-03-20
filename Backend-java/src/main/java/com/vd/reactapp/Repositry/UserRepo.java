package com.vd.reactapp.Repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vd.reactapp.entities.User;
@Repository
public interface UserRepo extends JpaRepository<User, Integer>{

	User findByUsername(String username);
}
