package com.info.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Type_Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long Id_type_Ticket;
	
	@Column(name = "nom_type_Ticket")
	private String nom_type_Ticket;

}
