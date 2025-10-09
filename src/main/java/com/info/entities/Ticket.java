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
public class Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long Id_ticket;
	
	@Column(name = "numero_ticket")
	private String numero_ticket;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "date_creation_ticket")
	private Date date_creation_ticket;
	
	@ManyToOne
	@JoinColumn(name = "id_niveau_criticite")
	private Niveau_criticite niveau_criticite;
	
	@ManyToOne
	@JoinColumn(name = "id_personnel")
	private Personnel personnel;
	
	@ManyToOne
	@JoinColumn(name = "id_type_Ticket")
	private Type_Ticket type_Ticket;

}
