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
public class Solution {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long Id_solution;
	
	@Column(name = "type_equipement")
	private String type_equipement;
	
	@Column(name = "description_solution")
	private String description_solution;
	
	@Column(name = "remarque")
	private String remarque;
	
	@Column(name = "marque_equipement")
	private String marque_equipement;
	
	@Column(name = "localisation")
	private String localisation;
	
	@Column(name = "autre_equipement")
	private String autre_equipement;

	@Column(name = "date_solution")
	private Date date_solution;
	
	@ManyToOne
	@JoinColumn(name = "id_suivi_Ticket")
	private Suivi_Ticket suivi_Ticket;

}
