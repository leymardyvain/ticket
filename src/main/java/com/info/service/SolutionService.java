package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Solution;
import com.info.repo.SolutionRepo;

@Service
public class SolutionService {

	private final SolutionRepo SolutionRepo;

	public SolutionService(SolutionRepo SolutionRepo) {
		this.SolutionRepo = SolutionRepo;
	}

	public List<Solution> getAllSolutions() {
		return SolutionRepo.findAll();
	}

	public Solution getSolutionById(Long id) {
		try {
			Solution Solution = SolutionRepo.findSolutionByID(id);
			return Solution;
		} catch (Exception e) {
			new RuntimeException("Solution not found");
		}
		return null;
	}

	public List<Solution> getSolutionByID_suivi_Ticket(Long id) {
		try {
			List<Solution> Solution = SolutionRepo.findSolutionByIDSuiviTicket(id);
			return Solution;
		} catch (Exception e) {
			new RuntimeException("Solution not found");
		}
		return null;
	}

	
	public Solution createSolution(Solution Solution) {
		return SolutionRepo.save(Solution);
	}

	public Solution updateSolution(Long id, Solution Solution) {
		Solution existingSolution = SolutionRepo.findSolutionByID(id);
		return SolutionRepo.save(existingSolution);

	}
}
