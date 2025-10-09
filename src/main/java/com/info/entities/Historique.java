package com.info.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Historique {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long Id_historique;
	
	@Column(name = "date_creation_ticket")
	private Date date_historique;
	
	@ManyToOne
	@JoinColumn(name = "id_personnel_en_charge")
	private Personnel personnel_en_charge;
	
	@ManyToOne
	@JoinColumn(name = "id_personnel_assignateur")
	private Personnel personnel_assignateur;
	
	@ManyToOne
	@JoinColumn(name = "id_suivi_Ticket")
	private Suivi_Ticket suivi_Ticket;
	
	@Column(name = "historique_etat_ticket")
	private String historique_etat_ticket;
	
}
