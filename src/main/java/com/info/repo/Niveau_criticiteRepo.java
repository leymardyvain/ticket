package com.info.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Niveau_criticite;

@Repository
public interface Niveau_criticiteRepo extends JpaRepository<Niveau_criticite, Long> {
	
	@Query("select u from Niveau_criticite u where u.nom_niveau_criticite= :nom")
	Niveau_criticite findNiveauCriticiteByNomNiveau_criticite(String nom);

}


