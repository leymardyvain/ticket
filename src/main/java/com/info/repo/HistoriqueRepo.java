package com.info.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Historique;

@Repository
public interface HistoriqueRepo extends JpaRepository<Historique, Long> {

	@Query("select u from Historique u where u.suivi_Ticket.Id_suivi_Ticket= :Id_suivi_Ticket ORDER BY Id_historique DESC")
	List<Historique> findHistoriqueByID_suivi_Ticket(Long Id_suivi_Ticket);
	
	@Query("select u from Historique u where u.suivi_Ticket.ticket.personnel.user.username= :username ORDER BY Id_historique DESC")
	List<Historique> findHistoriqueByID_Personnel(String username);
}


