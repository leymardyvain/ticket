package com.info.entities;

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
public class Departement {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long Id_departement;
	
	@Column(name = "nom_departement")
	private String nom_departement;
	
	@ManyToOne
	@JoinColumn(name = "id_societe")
	private Societe societe;

}
