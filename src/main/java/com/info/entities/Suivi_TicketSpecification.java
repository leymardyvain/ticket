package com.info.entities;

import java.util.Date;

import org.springframework.data.jpa.domain.Specification;

public class Suivi_TicketSpecification {

	public static Specification<Suivi_Ticket> hasNumeroTicket(String num) {
		return (root, query, criterialBuilder) -> criterialBuilder.equal(root.get("ticket").get("numero_ticket"), num);
	}

	public static Specification<Suivi_Ticket> hasInitiateurName(String nom_personnel) {
		return (root, query, criterialBuilder) -> criterialBuilder
				.equal(root.get("ticket").get("personnel").get("nom_personnel"), nom_personnel);
	}

	public static Specification<Suivi_Ticket> hasEtatTicket(String nom_etat) {
		return (root, query, criterialBuilder) -> criterialBuilder.equal(root.get("etat_Ticket").get("nom_etat_Ticket"),
				nom_etat);
	}

	public static Specification<Suivi_Ticket> hasTypeTicket(String nom_type_Ticket) {
		return (root, query, criterialBuilder) -> criterialBuilder.equal(root.get("ticket").get("type_Ticket").get("nom_type_Ticket"),
				nom_type_Ticket);
	}
	
	public static Specification<Suivi_Ticket> hasNiveauCriticite(String nom_niveau_criticite) {
		return (root, query, criterialBuilder) -> criterialBuilder.equal(root.get("ticket").get("niveau_criticite").get("nom_niveau_criticite"),
				nom_niveau_criticite);
	}

	public static Specification<Suivi_Ticket> hasPersoneChargeName(String nom_personnel_en_charge) {
		return (root, query, criterialBuilder) -> criterialBuilder
				.equal(root.get("personnel_en_charge").get("nom_personnel"), nom_personnel_en_charge);
	}

	public static Specification<Suivi_Ticket> hasPersoneAssignateurName(String nom_personnel_assignateur) {
		return (root, query, criterialBuilder) -> criterialBuilder
				.equal(root.get("personnel_assignateur").get("nom_personnel"), nom_personnel_assignateur);
	}

	public static Specification<Suivi_Ticket> hasDateDebut(Date debut) {
		return (root, query, criterialBuilder) -> criterialBuilder
				.greaterThanOrEqualTo(root.get("ticket").get("date_creation_ticket"), debut);
	}

	public static Specification<Suivi_Ticket> hasDateFin(Date fin) {
		return (root, query, criterialBuilder) -> criterialBuilder.
				lessThanOrEqualTo(root.get("ticket").get("date_creation_ticket"), fin);
	}

}
