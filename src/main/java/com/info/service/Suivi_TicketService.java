package com.info.service;


import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.info.entities.Suivi_Ticket;
import com.info.entities.Suivi_TicketSpecification;
import com.info.repo.Suivi_TicketRepo;

@Service
public class Suivi_TicketService {

	private final Suivi_TicketRepo Suivi_TicketRepo;

	public Suivi_TicketService(Suivi_TicketRepo Suivi_TicketRepo) {
		this.Suivi_TicketRepo = Suivi_TicketRepo;
	}

	public List<Suivi_Ticket> getAllSuivi_Tickets() {
		return Suivi_TicketRepo.findAll();
	}
	
	public Suivi_Ticket getSuivi_TicketsByIDTicket(Long id) {
		return Suivi_TicketRepo.findTicket(id);
	}

	public Suivi_Ticket getSuivi_TicketById(Long id) {

		try {
			Suivi_Ticket Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByID(id);
			return Suivi_TicketRepo.save(Suivi_Ticket);
		} catch (Exception e) {
			new RuntimeException("Suivi_Ticket not found");
		}
		return null;
	}
	
	public List<Suivi_Ticket> getAllSuivi_TicketByAdmin() {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findAllSuiviTicketByAdmin();
		return Suivi_Ticket;
	}


	public List<Suivi_Ticket> getSuivi_TicketByNomEtatTicket(String name) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByNomEtatTicket(name);
		return Suivi_Ticket;
	}

	public List<Suivi_Ticket> getSuivi_TicketByUsername(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByUsername(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByUsernameHasPersonnelEnCharge(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByUsernameHasPersonnelEnCharge(username);
		return Suivi_Ticket;
	}
	
	
	public List<Suivi_Ticket> getSuivi_TicketByNom_societe() {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo
				.findSuiviTicketByNom_societe();
		return Suivi_Ticket;
	}

	public List<Suivi_Ticket> getSuivi_TicketByNom_societeEn_attente_assignation() {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo
				.findSuiviTicketByNom_societeEn_attente_assignation();
		return Suivi_Ticket;
	}

	public List<Suivi_Ticket> getSuivi_TicketByNom_societeEn_cours_résolution(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByNom_societeEn_cours_résolution(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByNom_societeEn_cours_résolution_confirmation(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByNom_societeEn_cours_résolution_new(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatEnCoursResolutionDashboard(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByEtatEnCoursResolution_dashboard(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatEnCoursResolutionDashboardAdmin() {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByEnCoursResolution_dashboardAdmin();
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatAssigneDashboard(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByEtatAssigne_dashboard(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatAssigneDashboardAdmin() {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByAssigne_dashboardAdmin();
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatEnAttenteAssignationDashboard(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByEtatEnAttenteAssignation_dashboard(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatEnAttenteAssignationDashboardAdmin() {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByEtatEnAttenteAssignation_dashboardAdmin();
		return Suivi_Ticket;
	}
	
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatResolu(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByEtatResolu(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatResoluDashboard(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByEtatResolu_dashboard(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatResoluDashboardAdmin() {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByResolu_dashboardAdmin();
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatFerme(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByEtatFerme(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatFermeDashboard(String username) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByEtatFerme_dashboard(username);
		return Suivi_Ticket;
	}
	
	public List<Suivi_Ticket> getSuivi_TicketByEtatFermeDashboardAdmin() {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByFerme_dashboardAdmin();
		return Suivi_Ticket;
	}

	public List<Suivi_Ticket> getSuivi_TicketByNumeroTicket(String num) {
		List<Suivi_Ticket> Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByNumeroTicket(num);
		return Suivi_Ticket;
	}

	public Suivi_Ticket createSuivi_Ticket(Suivi_Ticket Suivi_Ticket) {
		return Suivi_TicketRepo.save(Suivi_Ticket);
	}

	public Suivi_Ticket updateSuivi_Ticket(Long id, Suivi_Ticket Suivi_Ticket) {
		try {
			Suivi_Ticket existingSuivi_Ticket = Suivi_TicketRepo.findSuiviTicketByID(id);
			existingSuivi_Ticket.setPersonnel_assignateur(Suivi_Ticket.getPersonnel_assignateur());
			existingSuivi_Ticket.setPersonnel_en_charge(Suivi_Ticket.getPersonnel_en_charge());
			existingSuivi_Ticket.setEtat_Ticket(Suivi_Ticket.getEtat_Ticket());
			existingSuivi_Ticket.setDate_suivi_ticket(Suivi_Ticket.getDate_suivi_ticket());
			return Suivi_TicketRepo.save(existingSuivi_Ticket);
		} catch (Exception e) {
			new RuntimeException("Suivi_Ticket not found");
		}
		return null;
	}

	public void deleteSuivi_Ticket(Long id) {
		try {
			Suivi_Ticket Suivi_Ticket = Suivi_TicketRepo.findSuiviTicketByID(id);
			Suivi_TicketRepo.delete(Suivi_Ticket);
		} catch (Exception e) {
			new RuntimeException("Suivi_Ticket not found");
		}
	}
	
	public List<Suivi_Ticket> findAllFiltered (String nom_personnel, String nom_etat,String nom_type, String nom_niv_crit, String nom_personnel_en_charge, String nom_personnel_assignateur, Date debut, Date fin){
		
		Specification <Suivi_Ticket> spec = Specification.where(null);
							
		if (!nom_personnel.equals("null")) {
			spec = spec.and(Suivi_TicketSpecification.hasInitiateurName(nom_personnel));
		}

		if (!nom_etat.equals("null")) {
			spec = spec.and(Suivi_TicketSpecification.hasEtatTicket(nom_etat));
		}
		
		if (!nom_type.equals("null")) {
			spec = spec.and(Suivi_TicketSpecification.hasTypeTicket(nom_type));
		}
		
		if (!nom_niv_crit.equals("null")) {
			spec = spec.and(Suivi_TicketSpecification.hasNiveauCriticite(nom_niv_crit));
		}
		
		if (!nom_personnel_en_charge.equals("null")) {
			spec = spec.and(Suivi_TicketSpecification.hasPersoneChargeName(nom_personnel_en_charge));
		}
		
		if (!nom_personnel_assignateur.equals("null")) {
			spec = spec.and(Suivi_TicketSpecification.hasPersoneAssignateurName(nom_personnel_assignateur));
		}
		
		if (debut != null) {
			spec = spec.and(Suivi_TicketSpecification.hasDateDebut(debut));
		}
		
		if (fin != null) {
			spec = spec.and(Suivi_TicketSpecification.hasDateFin(fin));
		}
				
		return Suivi_TicketRepo.findAll(spec);
		
	}
}
