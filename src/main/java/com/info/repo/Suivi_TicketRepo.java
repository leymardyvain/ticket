package com.info.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Suivi_Ticket;

@Repository
public interface Suivi_TicketRepo extends JpaRepository<Suivi_Ticket, Long>, JpaSpecificationExecutor<Suivi_Ticket>  {
		
	@Query("select u from Suivi_Ticket u ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findAllSuiviTicketByAdmin();

	@Query("select u from Suivi_Ticket u where u.Id_suivi_Ticket= :id ORDER BY Id_suivi_Ticket DESC")
	Suivi_Ticket findSuiviTicketByID(Long id);
	
	@Query("select u from Suivi_Ticket u where u.ticket.Id_ticket= :id ORDER BY Id_suivi_Ticket DESC")
	Suivi_Ticket findTicket(Long id);

	@Query("select u from Suivi_Ticket u where u.ticket.numero_ticket= :num ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByNumeroTicket(String num);

	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= :nom ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByNomEtatTicket(String nom);

	@Query("select u from Suivi_Ticket u where u.ticket.personnel.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByUsername(String username);
	
	@Query("select u from Suivi_Ticket u where u.ticket.personnel.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByUsernameHasPersonnelEnCharge(String username);
	
	@Query("select u from Suivi_Ticket u ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByNom_societe();
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'En attente assignation' ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByNom_societeEn_attente_assignation();

	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'Assigné' AND u.personnel_en_charge.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByNom_societeEn_cours_résolution(String username);
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'En cours résolution' AND u.personnel_en_charge.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByNom_societeEn_cours_résolution_new(String username);
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'Résolu' AND u.personnel_en_charge.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByEtatResolu(String username);
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'Fermé' AND u.personnel_en_charge.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByEtatFerme(String username);
	
	/******************  Dashboard User **************************************************/
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'En attente assignation' AND u.ticket.personnel.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByEtatEnAttenteAssignation_dashboard(String username);
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'Assigné' AND u.ticket.personnel.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByEtatAssigne_dashboard(String username);
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'En cours résolution' AND u.ticket.personnel.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByEtatEnCoursResolution_dashboard(String username);
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'Résolu' AND u.ticket.personnel.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByEtatResolu_dashboard(String username);
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'Fermé' AND u.ticket.personnel.user.username= :username ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByEtatFerme_dashboard(String username);
	
	/******************  Dashboard Admin Superviseur **************************************************/
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'En attente assignation' ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByEtatEnAttenteAssignation_dashboardAdmin();
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'Assigné' ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByAssigne_dashboardAdmin();
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'En cours résolution' ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByEnCoursResolution_dashboardAdmin();
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'Résolu' ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByResolu_dashboardAdmin();
	
	@Query("select u from Suivi_Ticket u where u.etat_Ticket.nom_etat_Ticket= 'Fermé' ORDER BY Id_suivi_Ticket DESC")
	List<Suivi_Ticket> findSuiviTicketByFerme_dashboardAdmin();
}
