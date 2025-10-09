package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Type_Ticket;
import com.info.repo.Type_TicketRepo;



@Service
public class Type_TicketService {
	
	  private final Type_TicketRepo Type_TicketRepo;
	  
	  public Type_TicketService(Type_TicketRepo Type_TicketRepo) {
	      this.Type_TicketRepo = Type_TicketRepo;
	  }
	  

	    public List<Type_Ticket> getAllType_Tickets() {
	        return Type_TicketRepo.findAll();
	    }

	    public Type_Ticket getType_TicketById(Long id) {
	        Type_Ticket Type_Ticket = Type_TicketRepo.findById(id).orElseThrow(() -> new RuntimeException("Type_Ticket not found"));
	        return Type_Ticket;
	    }
	    
	    public Type_Ticket getType_TicketByNom(String name) {
	        Type_Ticket Type_Ticket = Type_TicketRepo.findNiveauCriticiteByNomType_Ticket(name);
	        return Type_Ticket;
	    }

	    public Type_Ticket createType_Ticket(Type_Ticket Type_Ticket) {
	    	return Type_TicketRepo.save(Type_Ticket);
	    }

	    public Type_Ticket updateType_Ticket(Long id, Type_Ticket Type_Ticket) {
	        Type_Ticket existingType_Ticket = Type_TicketRepo.findById(id).orElseThrow(() -> new RuntimeException("Type_Ticket not found"));
	        existingType_Ticket.setNom_type_Ticket(Type_Ticket.getNom_type_Ticket());
	        return Type_TicketRepo.save(existingType_Ticket);
	         
	    }

	    public void deleteType_Ticket(Long id) {
	        Type_Ticket Type_Ticket = Type_TicketRepo.findById(id).orElseThrow(() -> new RuntimeException("Type_Ticket not found"));
	        Type_TicketRepo.delete(Type_Ticket);
	    }
}
