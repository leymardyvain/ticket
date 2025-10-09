package com.info.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Personnel;

@Repository
public interface PersonnelRepo extends JpaRepository<Personnel, Long> {
	
	@Query("select u from Personnel u where u.nom_personnel= :nom")
	Personnel findPersonnelByNomPersonnel(String nom);
	
	@Query("select u from Personnel u where u.departement.nom_departement= :nom")
	Personnel findPersonnelByNomDepartement(String nom);
	
	@Query("select u from Personnel u where u.user.username= :username")
	Personnel findPersonnelByUserUsername(String username);
	
	@Query("select u from Personnel u")
	List<Personnel> findPersonnelByNom_societe();

}
