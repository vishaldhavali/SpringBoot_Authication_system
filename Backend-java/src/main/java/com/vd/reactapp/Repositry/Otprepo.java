package com.vd.reactapp.Repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vd.reactapp.entities.Otp;
import com.vd.reactapp.entities.User;
@Repository
public interface Otprepo extends JpaRepository<Otp, Integer> {

	Otp findByUser(User user);
}
