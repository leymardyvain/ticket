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
public class Suivi_Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long Id_suivi_Ticket;
	
	@ManyToOne
	@JoinColumn(name = "id_ticket")
	private Ticket ticket;

	@ManyToOne
	@JoinColumn(name = "id_etat_Ticket")
	private Etat_Ticket etat_Ticket;
	
	@Column(name = "date_suivi_ticket")
	private Date date_suivi_ticket;
	
	@ManyToOne
	@JoinColumn(name = "id_personnel_en_charge")
	private Personnel personnel_en_charge;
	
	@ManyToOne
	@JoinColumn(name = "id_personnel_assignateur")
	private Personnel personnel_assignateur;
	
}
