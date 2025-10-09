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

import com.info.entities.Type_Ticket;
import com.info.service.Type_TicketService;


@RestController
@RequestMapping("/api/type_Ticket")
public class Type_TicketController {

	private final Type_TicketService type_TicketService;

	public Type_TicketController(Type_TicketService type_TicketService) {
		this.type_TicketService = type_TicketService;
	}

	@GetMapping
	public ResponseEntity<List<Type_Ticket>> getAllType_Tickets() {
		List<Type_Ticket> type_Tickets = type_TicketService.getAllType_Tickets();
		return ResponseEntity.ok(type_Tickets);
	}

	// Get a type_Ticket by ID
	@GetMapping("/{id}")
	public ResponseEntity<Type_Ticket> getType_TicketById(@PathVariable Long id) {
		Type_Ticket type_Ticket = type_TicketService.getType_TicketById(id);
		return ResponseEntity.ok(type_Ticket);
	}
	
	// Get a type_Ticket by name
	@GetMapping("/type_Ticketbyname/{name}")
	public ResponseEntity<Type_Ticket> getType_TicketByName(@PathVariable String name) {
		Type_Ticket type_Ticket = type_TicketService.getType_TicketByNom(name);
		return ResponseEntity.ok(type_Ticket);
	}

	//  Create a new type_Ticket
	  @PostMapping 
	  public ResponseEntity<Type_Ticket>createType_Ticket(@RequestBody Type_Ticket type_Ticket) {
		  	Type_Ticket createdType_Ticket = type_TicketService.createType_Ticket(type_Ticket); 
	  return ResponseEntity.ok(createdType_Ticket); }
	 

	// Update a type_Ticket
	@PutMapping("/{id}")
	public ResponseEntity<Type_Ticket> updateType_Ticket(@PathVariable Long id,
			@RequestBody Type_Ticket type_Ticket) {
		Type_Ticket updatedType_Ticket = type_TicketService.updateType_Ticket(id, type_Ticket);
		return ResponseEntity.ok(updatedType_Ticket);
	}

	// Delete a type_Ticket
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteType_Ticket(@PathVariable Long id) {
		type_TicketService.deleteType_Ticket(id);
		return ResponseEntity.noContent().build();
	}

}
