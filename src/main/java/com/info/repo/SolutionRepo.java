package com.info.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Solution;


@Repository
public interface SolutionRepo extends JpaRepository<Solution, Long> {
	
	@Query("select u from Solution u where u.Id_solution= :id ORDER BY Id_solution DESC")
	Solution findSolutionByID(Long id);
	
	@Query("select u from Solution u where u.suivi_Ticket.Id_suivi_Ticket= :id")
	List<Solution> findSolutionByIDSuiviTicket(Long id);
	
}
