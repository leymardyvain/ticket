package com.info.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Departement;

@Repository
public interface DepartementRepo extends JpaRepository<Departement, Long> {
	
	@Query("select u from Departement u where u.nom_departement= :nom")
	Departement findDepartementByNomDepartement(String nom);
	
	@Query("select u from Departement u where u.societe.nom_societe= :nom")
	List<Departement> findDepartementByNomSociete(String nom);


}


