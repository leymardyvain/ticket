package com.info.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Email;

@Repository
public interface EmailRepo extends JpaRepository<Email, Long> {
	
	@Query("select u from Email u where u.libelle_email= :lib")
	Email findEmailByLibelleEmail(String lib);

}


