package com.info.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Cisco;

@Repository
public interface CiscoRepo extends JpaRepository<Cisco, Long> {
	
	@Query("select u from Cisco u where u.numero_cisco= :num")
	Cisco findCiscoByNumeroCisco(String num);

}


