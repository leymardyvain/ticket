package com.info.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.info.entities.Etat_Ticket;
import com.info.entities.Historique;
import com.info.entities.Notification;
import com.info.entities.Solution;
import com.info.entities.Suivi_Ticket;
import com.info.service.Etat_TicketService;
import com.info.service.HistoriqueService;
import com.info.service.NotificationService;
import com.info.service.SolutionService;
import com.info.service.Suivi_TicketService;

@RestController
@RequestMapping("/api/solution")
public class SolutionController {

	private final SolutionService solutionService;

	private final HistoriqueService historiqueService;

	private final Suivi_TicketService suivi_TicketService;

	private final Etat_TicketService etat_TicketService;
	
	private final NotificationService notificationService;

	public SolutionController(SolutionService solutionService, HistoriqueService historiqueService,
			Suivi_TicketService suivi_TicketService, Etat_TicketService etat_TicketService, NotificationService notificationService) {
		this.solutionService = solutionService;
		this.historiqueService = historiqueService;
		this.suivi_TicketService = suivi_TicketService;
		this.etat_TicketService = etat_TicketService;
		this.notificationService = notificationService;
	}

	@GetMapping
	public ResponseEntity<List<Solution>> getAllSolutions() {
		List<Solution> solutions = solutionService.getAllSolutions();
		return ResponseEntity.ok(solutions);
	}

	// Get a solution by ID
	@GetMapping("/{id}")
	public ResponseEntity<Solution> getSolutionById(@PathVariable Long id) {
		Solution solution = solutionService.getSolutionById(id);
		return ResponseEntity.ok(solution);
	}

	// Get a solution by suivi_Ticket
	@GetMapping("/suivi_ticket/{id_suivi_ticket}")
	public ResponseEntity<List<Solution>> getSolutionByID_suivi_Ticket(@PathVariable Long id_suivi_ticket) {
		List<Solution> solution = solutionService.getSolutionByID_suivi_Ticket(id_suivi_ticket);
		return ResponseEntity.ok(solution);
	}

	@PostMapping
	public ResponseEntity<?> createSolution(@RequestBody Solution solution) {

		solution.setDate_solution(new Date());

		Suivi_Ticket recupsuivi_Ticket = solution.getSuivi_Ticket();
		Etat_Ticket newEtat_Ticket = etat_TicketService.getEtat_TicketByNom("Résolu");

		recupsuivi_Ticket.setDate_suivi_ticket(new Date());
		recupsuivi_Ticket.setEtat_Ticket(newEtat_Ticket);
		recupsuivi_Ticket.setPersonnel_assignateur(solution.getSuivi_Ticket().getPersonnel_assignateur());
		recupsuivi_Ticket.setPersonnel_en_charge(solution.getSuivi_Ticket().getPersonnel_en_charge());
		suivi_TicketService.updateSuivi_Ticket(recupsuivi_Ticket.getId_suivi_Ticket(), recupsuivi_Ticket);
		
		Suivi_Ticket recupsuivi_Ticket2 = suivi_TicketService
				.getSuivi_TicketById(recupsuivi_Ticket.getId_suivi_Ticket());

		Historique newHistorique2 = new Historique();
		newHistorique2.setDate_historique(recupsuivi_Ticket.getDate_suivi_ticket());
		newHistorique2.setPersonnel_assignateur(recupsuivi_Ticket2.getPersonnel_assignateur());
		newHistorique2.setPersonnel_en_charge(recupsuivi_Ticket2.getPersonnel_en_charge());
		newHistorique2.setSuivi_Ticket(recupsuivi_Ticket2);
		newHistorique2.setHistorique_etat_ticket(recupsuivi_Ticket2.getEtat_Ticket().getNom_etat_Ticket());
		historiqueService.createHistorique(newHistorique2);

		solutionService.createSolution(solution);
		
		Notification notification = new Notification();
		notification.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification.setIsreading(false);
		notification.setPersonnel_concerne(recupsuivi_Ticket.getTicket().getPersonnel());
		notification.setMessage("Votre ticket a été résolu, veuillez confirmer cet etat");
		notification.setCode("RE");
		notification.setType("Action");
		notification.setSuivi_Ticket(recupsuivi_Ticket);
		notificationService.createNotification(notification);
		
		Notification notification2 = new Notification();
		notification2.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification2.setIsreading(false);
		notification2.setPersonnel_concerne(recupsuivi_Ticket.getPersonnel_assignateur());
		notification2.setMessage("Le N° Ticket "+recupsuivi_Ticket.getTicket().getNumero_ticket()+"  a été résolu par "+recupsuivi_Ticket.getPersonnel_en_charge().getNom_personnel());
		notification2.setCode("RE");
		notification2.setType("Info");
		notification2.setSuivi_Ticket(recupsuivi_Ticket);
		notificationService.createNotification(notification2);
		
		
		return ResponseEntity.ok("Solution bien ajoutée");
	}

	@PutMapping("/{id}")
	public ResponseEntity<Solution> updateSolution(@PathVariable Long id, @RequestBody Solution solution) {
		Solution updatedSolution = solutionService.updateSolution(id, solution);
		return ResponseEntity.ok(updatedSolution);
	}

}
