package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Etat_Ticket;
import com.info.repo.Etat_TicketRepo;



@Service
public class Etat_TicketService {
	
	  private final Etat_TicketRepo Etat_TicketRepo;
	  
	  public Etat_TicketService(Etat_TicketRepo Etat_TicketRepo) {
	      this.Etat_TicketRepo = Etat_TicketRepo;
	  }
	  

	    public List<Etat_Ticket> getAllEtat_Tickets() {
	        return Etat_TicketRepo.findAll();
	    }

	    public Etat_Ticket getEtat_TicketById(Long id) {
	        Etat_Ticket Etat_Ticket = Etat_TicketRepo.findById(id).orElseThrow(() -> new RuntimeException("Etat_Ticket not found"));
	        return Etat_Ticket;
	    }
	    
	    public Etat_Ticket getEtat_TicketByNom(String name) {
	        Etat_Ticket Etat_Ticket = Etat_TicketRepo.findNiveauCriticiteByNomEtat_Ticket(name);
	        return Etat_Ticket;
	    }

	    public Etat_Ticket createEtat_Ticket(Etat_Ticket Etat_Ticket) {
	    	return Etat_TicketRepo.save(Etat_Ticket);
	    }

	    public Etat_Ticket updateEtat_Ticket(Long id, Etat_Ticket Etat_Ticket) {
	        Etat_Ticket existingEtat_Ticket = Etat_TicketRepo.findById(id).orElseThrow(() -> new RuntimeException("Etat_Ticket not found"));
	        existingEtat_Ticket.setNom_etat_Ticket(Etat_Ticket.getNom_etat_Ticket());
	        return Etat_TicketRepo.save(existingEtat_Ticket);
	         
	    }

	    public void deleteEtat_Ticket(Long id) {
	        Etat_Ticket Etat_Ticket = Etat_TicketRepo.findById(id).orElseThrow(() -> new RuntimeException("Etat_Ticket not found"));
	        Etat_TicketRepo.delete(Etat_Ticket);
	    }
}
