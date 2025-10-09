package com.info.entities;

import java.util.Date;

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
public class Ville {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long Id_ville;
	
	@Column(name = "nom_ville")
	private String nom_ville;
	
	@Column(name = "date_creation_ville")
	private Date date_creation_ville;
	
	@Column(name = "is_delete")
	private Boolean is_delete;

}
