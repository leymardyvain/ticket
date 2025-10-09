package com.info.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Type_Ticket;

@Repository
public interface Type_TicketRepo extends JpaRepository<Type_Ticket, Long> {
	
	@Query("select u from Type_Ticket u where u.nom_type_Ticket= :nom")
	Type_Ticket findNiveauCriticiteByNomType_Ticket(String nom);

}


