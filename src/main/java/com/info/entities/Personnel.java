package com.info.entities;


import com.info.access.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
public class Personnel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long Id_personnel;
	
	@Column(name = "nom_personnel")
	private String nom_personnel;
	
	@ManyToOne
	@JoinColumn(name = "id_departement")
	private Departement departement;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_user")
	private User user;
	
	@Column(name = "is_delete")
	private Boolean is_delete;

}
