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
public class Niveau_criticite {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long Id_niveau_criticite;
	
	@Column(name = "nom_niveau_criticite")
	private String nom_niveau_criticite;

}
