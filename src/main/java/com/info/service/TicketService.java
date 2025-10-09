package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Ticket;
import com.info.repo.TicketRepo;



@Service
public class TicketService {
	
	  private final TicketRepo TicketRepo;
	  
	  public TicketService(TicketRepo TicketRepo) {
	      this.TicketRepo = TicketRepo;
	  }
	  
	    public List<Ticket> getAllTickets() {
	        return TicketRepo.findAll();
	    }

	    public Ticket getTicketById(Long id) {
	        Ticket Ticket = TicketRepo.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
	        return Ticket;
	    }
	    
	    public Ticket getTicketByNom(String name) {
	        Ticket Ticket = TicketRepo.findTicketByDescription(name);
	        return Ticket;
	    }
	    
	    public List<Ticket> getAllUserTicketByUsername(String username) {
	    	List<Ticket> Ticket = TicketRepo.findAllTicketForUserByUsername(username);
	        return Ticket;
	    }
	    
	    public List<Ticket> getAllUserTicket() {
	    	List<Ticket> Ticket = TicketRepo.findAllTicket();
	        return Ticket;
	    }
	    
	    public Ticket getTicketByNumero(String num) {
	        Ticket Ticket = TicketRepo.findTicketByNumeroTicket(num);
	        return Ticket;
	    }
	    
	    public Ticket createTicket(Ticket Ticket) {
	    	return TicketRepo.save(Ticket);
	    }

	    public Ticket updateTicket(Long id, Ticket Ticket) {
	        Ticket existingTicket = TicketRepo.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
	        existingTicket.setDescription(Ticket.getDescription());
	        return TicketRepo.save(existingTicket);
	         
	    }

	    public void deleteTicket(Long id) {
	        Ticket Ticket = TicketRepo.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
	        TicketRepo.delete(Ticket);
	    }
}
