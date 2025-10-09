package com.info.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.info.entities.Etat_Ticket;
import com.info.entities.Notification;
import com.info.entities.Personnel;
import com.info.entities.Suivi_Ticket;
import com.info.entities.Ticket;
import com.info.form.FormDataTicket;
import com.info.service.Etat_TicketService;
import com.info.service.NotificationService;
import com.info.service.PersonnelService;
import com.info.service.StorageService;
import com.info.service.Suivi_TicketService;
import com.info.service.TicketService;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

	private final TicketService ticketService;

	private final PersonnelService personnelService;

	private final Suivi_TicketService suivi_TicketService;
	
	private final Etat_TicketService etat_TicketService;
	
	private final NotificationService notificationService;

	public TicketController(TicketService ticketService, PersonnelService personnelService,NotificationService notificationService, 
			StorageService imageService, Suivi_TicketService suivi_TicketService, Etat_TicketService etat_TicketService) {
		this.ticketService = ticketService;
		this.personnelService = personnelService;
		this.suivi_TicketService = suivi_TicketService;
		this.etat_TicketService = etat_TicketService;
		this.notificationService = notificationService;
	}

	@GetMapping
	public ResponseEntity<List<Ticket>> getAllTickets() {
		List<Ticket> tickets = ticketService.getAllTickets();
		return ResponseEntity.ok(tickets);
	}
	
	// Get all ticket of username
	@GetMapping("/all_user_ticket/{username}")
	public ResponseEntity<List<Ticket>> getAllUserTicketByUsername(@PathVariable String username) {
		List<Ticket> tickets = ticketService.getAllUserTicketByUsername(username);
		return ResponseEntity.ok(tickets);
	}
	
	@GetMapping("/all_ticket")
	public ResponseEntity<List<Ticket>> getAllTicket() {
		List<Ticket> tickets = ticketService.getAllTickets();
		return ResponseEntity.ok(tickets);
	}

	// Get a ticket by ID
	@GetMapping("/{id}")
	public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
		Ticket ticket = ticketService.getTicketById(id);
		return ResponseEntity.ok(ticket);
	}

	// Get a ticket by name
	@GetMapping("/ticketbyname/{name}")
	public ResponseEntity<Ticket> getTicketByName(@PathVariable String name) {
		Ticket ticket = ticketService.getTicketByNom(name);
		return ResponseEntity.ok(ticket);
	}

	// Create a new ticket
	@PostMapping
	public ResponseEntity<Ticket> createTicket(@RequestBody FormDataTicket formDataTicket) throws IOException {
		Ticket newTicket = new Ticket();
		newTicket.setNumero_ticket(formDataTicket.getNumero_ticket());
		newTicket.setDescription(formDataTicket.getDescription());
		newTicket.setDate_creation_ticket(new Date());
		newTicket.setNiveau_criticite(formDataTicket.getNiveau_criticite());
		newTicket.setType_Ticket(formDataTicket.getType_Ticket());
		Personnel personnel = personnelService.getPersonnelByUserUsername(formDataTicket.getUsername());
		newTicket.setPersonnel(personnel);
		ticketService.createTicket(newTicket);
		
		Ticket RecupTicket = ticketService.getTicketByNumero(newTicket.getNumero_ticket());
		
		Etat_Ticket Newetat_Ticket = etat_TicketService.getEtat_TicketByNom("En attente assignation");
		
		Suivi_Ticket newSuivi_Ticket = new Suivi_Ticket();
		
		newSuivi_Ticket.setDate_suivi_ticket(new Date());
		newSuivi_Ticket.setEtat_Ticket(Newetat_Ticket);
		newSuivi_Ticket.setTicket(RecupTicket);
		newSuivi_Ticket.setEtat_Ticket(Newetat_Ticket);
		
		suivi_TicketService.createSuivi_Ticket(newSuivi_Ticket);
		
		Suivi_Ticket recupSuivi_Ticket = suivi_TicketService.getSuivi_TicketsByIDTicket(RecupTicket.getId_ticket());
		
		Notification notification = new Notification();
		
		notification.setDate_notification(new Date());
		notification.setIsreading(false);
		notification.setMessage("Un nouveau ticket est en attente d'assignation");
		notification.setSuivi_Ticket(recupSuivi_Ticket);
		notification.setCode("EAA");
		notification.setType("Action");		
		List<Personnel> recupSupervisor = personnelService.getPersonnelBAsRoleSupervisor();
		
		for(Personnel pers : recupSupervisor) {
			notification.setPersonnel_concerne(pers);
			notificationService.createNotification(notification);
		}
		
		return ResponseEntity.ok(newTicket);
	}

	// Update a ticket
	@PutMapping("/{id}")
	public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket ticket) {
		Ticket updatedTicket = ticketService.updateTicket(id, ticket);
		return ResponseEntity.ok(updatedTicket);
	}

	// Delete a ticket
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
		ticketService.deleteTicket(id);
		return ResponseEntity.noContent().build();
	}

}
