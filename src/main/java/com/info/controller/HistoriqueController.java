package com.info.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.info.entities.Etat_Ticket;
import com.info.entities.Historique;
import com.info.entities.Notification;
import com.info.entities.Suivi_Ticket;
import com.info.service.Etat_TicketService;
import com.info.service.HistoriqueService;
import com.info.service.NotificationService;
import com.info.service.Suivi_TicketService;

@RestController
@RequestMapping("/api/historique")
public class HistoriqueController {

	private final HistoriqueService historiqueService;

	private final Etat_TicketService etat_TicketService;

	private final Suivi_TicketService suivi_TicketService;
	
	private final NotificationService notificationService;

	public HistoriqueController(HistoriqueService historiqueService, Etat_TicketService etat_TicketService,
			Suivi_TicketService suivi_TicketService, NotificationService notificationService) {
		this.historiqueService = historiqueService;
		this.etat_TicketService = etat_TicketService;
		this.suivi_TicketService = suivi_TicketService;
		this.notificationService = notificationService;
	}

	@GetMapping
	public ResponseEntity<List<Historique>> getAllHistoriques() {
		List<Historique> historiques = historiqueService.getAllHistoriques();
		return ResponseEntity.ok(historiques);
	}

	// Get a historique by ID
	@GetMapping("/{id}")
	public ResponseEntity<Historique> getHistoriqueById(@PathVariable Long id) {
		Historique historique = historiqueService.getHistoriqueById(id);
		return ResponseEntity.ok(historique);
	}

	// Get a historique by ID suivi_Ticket

	@GetMapping("/historiquebysuivi_Ticket/{id}")
	public ResponseEntity<?> getHistoriqueBySuivi_ticketID(@PathVariable Long id) {
		List<Historique> historique = historiqueService.getHistoriqueById_suivi_Ticket(id);
		return ResponseEntity.ok(historique);
	}
	
	// Get a historique by ID Personnel

	@GetMapping("/historiquebypersonnel/{username}")
	public ResponseEntity<?> getHistoriqueByIDPersonnel(@PathVariable String username) {
		List<Historique> historique = historiqueService.getHistoriqueById_personnel(username);
		return ResponseEntity.ok(historique);
	}

	// Create a new historique
	@PostMapping
	public ResponseEntity<?> createHistorique(@RequestBody Historique historique) {

		Historique newHistorique = new Historique();
		newHistorique.setDate_historique(historique.getSuivi_Ticket().getTicket().getDate_creation_ticket());
		newHistorique.setPersonnel_assignateur(historique.getPersonnel_assignateur());
		newHistorique.setPersonnel_en_charge(historique.getPersonnel_en_charge());
		newHistorique.setSuivi_Ticket(historique.getSuivi_Ticket());
		newHistorique.setHistorique_etat_ticket(historique.getSuivi_Ticket().getEtat_Ticket().getNom_etat_Ticket());
		historiqueService.createHistorique(newHistorique);
		
		Suivi_Ticket recupsuivi_Ticket = historique.getSuivi_Ticket();
		Etat_Ticket newEtat_Ticket = etat_TicketService.getEtat_TicketByNom("Assigné");
		recupsuivi_Ticket.setDate_suivi_ticket(new Date());
		recupsuivi_Ticket.setEtat_Ticket(newEtat_Ticket);
		recupsuivi_Ticket.setPersonnel_assignateur(historique.getPersonnel_assignateur());
		recupsuivi_Ticket.setPersonnel_en_charge(historique.getPersonnel_en_charge());
		suivi_TicketService.updateSuivi_Ticket(recupsuivi_Ticket.getId_suivi_Ticket(), recupsuivi_Ticket);
				
		Suivi_Ticket recupsuiviTicket = suivi_TicketService.getSuivi_TicketById(recupsuivi_Ticket.getId_suivi_Ticket());
		
		Notification recupNotifcation = notificationService.getNotificationByIdAndType(recupsuiviTicket.getId_suivi_Ticket(), "EAA", "Action");
		if(recupNotifcation != null) {
			recupNotifcation.setIsreading(true);
			notificationService.updateNotificationWithObjet(recupNotifcation.getId_notification(), recupNotifcation);
		}

		Historique newHistorique2 = new Historique();
		newHistorique2.setDate_historique(new Date());
		newHistorique2.setPersonnel_assignateur(recupsuiviTicket.getPersonnel_assignateur());
		newHistorique2.setPersonnel_en_charge(recupsuiviTicket.getPersonnel_en_charge());
		newHistorique2.setSuivi_Ticket(recupsuiviTicket);
		newHistorique2.setHistorique_etat_ticket(recupsuiviTicket.getEtat_Ticket().getNom_etat_Ticket());
		historiqueService.createHistorique(newHistorique2);
		
		Notification notification = new Notification();
		notification.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification.setIsreading(false);
		notification.setPersonnel_concerne(recupsuivi_Ticket.getPersonnel_en_charge());
		notification.setMessage(recupsuivi_Ticket.getPersonnel_assignateur().getNom_personnel()+" vous a assigné un nouveau ticket");
		notification.setSuivi_Ticket(recupsuivi_Ticket);
		notification.setCode("AS");
		notification.setType("Action");
		notificationService.createNotification(notification);
		
		Notification notification2 = new Notification();
		notification2.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification2.setIsreading(false);
		notification2.setPersonnel_concerne(recupsuivi_Ticket.getTicket().getPersonnel());
		notification2.setMessage("le N° Ticket "+recupsuivi_Ticket.getTicket().getNumero_ticket()+" a été assigné à "+recupsuivi_Ticket.getPersonnel_en_charge().getNom_personnel());
		notification2.setCode("AS");
		notification2.setSuivi_Ticket(recupsuivi_Ticket);
		notification2.setType("Info");
		notificationService.createNotification(notification2);
		
		return ResponseEntity.ok("ok");
	}

	// Update a historique
	/*
	 * @PutMapping("/{id}") public ResponseEntity<Historique>
	 * updateHistorique(@PathVariable Long id,
	 * 
	 * @RequestBody Historique historique) { Historique updatedHistorique =
	 * historiqueService.updateHistorique(id, historique); return
	 * ResponseEntity.ok(updatedHistorique); }
	 */

	// Delete a historique
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteHistorique(@PathVariable Long id) {
		historiqueService.deleteHistorique(id);
		return ResponseEntity.noContent().build();
	}

}
