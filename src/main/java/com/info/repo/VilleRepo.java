package com.info.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Ville;

@Repository
public interface VilleRepo extends JpaRepository<Ville, Long> {
	
	@Query("select u from Ville u where u.nom_ville= :nom")
	Ville findVilleByNomVille(String nom);

}


