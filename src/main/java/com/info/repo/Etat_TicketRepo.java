package com.info.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Etat_Ticket;

@Repository
public interface Etat_TicketRepo extends JpaRepository<Etat_Ticket, Long> {
	
	@Query("select u from Etat_Ticket u where u.nom_etat_Ticket= :nom")
	Etat_Ticket findNiveauCriticiteByNomEtat_Ticket(String nom);

}


