package com.info.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Societe;


@Repository
public interface SocieteRepo extends JpaRepository<Societe, Long> {
	
	@Query("select u from Societe u where u.nom_societe= :nom")
	Societe findSocieteByNomSociete(String nom);
	
	@Query("select u from Societe u where u.ville.nom_ville= :nom")
	List<Societe> findSocieteByNomVille(String nom);

}
