package com.info.controller;

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
import com.info.service.Etat_TicketService;


@RestController
@RequestMapping("/api/etat_Ticket")
public class Etat_TicketController {

	private final Etat_TicketService etat_TicketService;

	public Etat_TicketController(Etat_TicketService etat_TicketService) {
		this.etat_TicketService = etat_TicketService;
	}

	@GetMapping
	public ResponseEntity<List<Etat_Ticket>> getAllEtat_Tickets() {
		List<Etat_Ticket> etat_Tickets = etat_TicketService.getAllEtat_Tickets();
		return ResponseEntity.ok(etat_Tickets);
	}

	// Get a etat_Ticket by ID
	@GetMapping("/{id}")
	public ResponseEntity<Etat_Ticket> getEtat_TicketById(@PathVariable Long id) {
		Etat_Ticket etat_Ticket = etat_TicketService.getEtat_TicketById(id);
		return ResponseEntity.ok(etat_Ticket);
	}
	
	// Get a etat_Ticket by name
	@GetMapping("/etat_Ticketbyname/{name}")
	public ResponseEntity<Etat_Ticket> getEtat_TicketByName(@PathVariable String name) {
		Etat_Ticket etat_Ticket = etat_TicketService.getEtat_TicketByNom(name);
		return ResponseEntity.ok(etat_Ticket);
	}

	//  Create a new etat_Ticket
	  @PostMapping 
	  public ResponseEntity<Etat_Ticket>createEtat_Ticket(@RequestBody Etat_Ticket etat_Ticket) {
		  	Etat_Ticket createdEtat_Ticket = etat_TicketService.createEtat_Ticket(etat_Ticket); 
	  return ResponseEntity.ok(createdEtat_Ticket); }
	 

	// Update a etat_Ticket
	@PutMapping("/{id}")
	public ResponseEntity<Etat_Ticket> updateEtat_Ticket(@PathVariable Long id,
			@RequestBody Etat_Ticket etat_Ticket) {
		Etat_Ticket updatedEtat_Ticket = etat_TicketService.updateEtat_Ticket(id, etat_Ticket);
		return ResponseEntity.ok(updatedEtat_Ticket);
	}

	// Delete a etat_Ticket
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEtat_Ticket(@PathVariable Long id) {
		etat_TicketService.deleteEtat_Ticket(id);
		return ResponseEntity.noContent().build();
	}

}
