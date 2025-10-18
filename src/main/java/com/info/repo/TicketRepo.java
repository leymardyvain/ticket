package com.info.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Solution;
import com.info.entities.Ticket;

@Repository
public interface TicketRepo extends JpaRepository<Ticket, Long> {
	
	@Query("select u from Ticket u where u.description= :nom ORDER BY Id_ticket DESC")
	Ticket findTicketByDescription(String nom);
	
	@Query("select u from Ticket u where u.numero_ticket= :num ORDER BY Id_ticket DESC")
	Ticket findTicketByNumeroTicket(String num);
	
	@Query("select u from Ticket u where u.personnel.user.username= :username ORDER BY Id_ticket DESC")
	List<Ticket> findAllTicketForUserByUsername(String username);
	
	@Query("select u from Ticket u ORDER BY Id_ticket DESC")
	List<Ticket> findAllTicket();
	
}


