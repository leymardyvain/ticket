package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Niveau_criticite;
import com.info.repo.Niveau_criticiteRepo;



@Service
public class Niveau_criticiteService {
	
	  private final Niveau_criticiteRepo Niveau_criticiteRepo;
	  
	  public Niveau_criticiteService(Niveau_criticiteRepo Niveau_criticiteRepo) {
	      this.Niveau_criticiteRepo = Niveau_criticiteRepo;
	  }
	  

	    public List<Niveau_criticite> getAllNiveau_criticites() {
	        return Niveau_criticiteRepo.findAll();
	    }

	    public Niveau_criticite getNiveau_criticiteById(Long id) {
	        Niveau_criticite Niveau_criticite = Niveau_criticiteRepo.findById(id).orElseThrow(() -> new RuntimeException("Niveau_criticite not found"));
	        return Niveau_criticite;
	    }
	    
	    public Niveau_criticite getNiveau_criticiteByNom(String name) {
	        Niveau_criticite Niveau_criticite = Niveau_criticiteRepo.findNiveauCriticiteByNomNiveau_criticite(name);
	        return Niveau_criticite;
	    }

	    public Niveau_criticite createNiveau_criticite(Niveau_criticite Niveau_criticite) {
	    	return Niveau_criticiteRepo.save(Niveau_criticite);
	    }

	    public Niveau_criticite updateNiveau_criticite(Long id, Niveau_criticite Niveau_criticite) {
	        Niveau_criticite existingNiveau_criticite = Niveau_criticiteRepo.findById(id).orElseThrow(() -> new RuntimeException("Niveau_criticite not found"));
	        existingNiveau_criticite.setNom_niveau_criticite(Niveau_criticite.getNom_niveau_criticite());
	        return Niveau_criticiteRepo.save(existingNiveau_criticite);
	         
	    }

	    public void deleteNiveau_criticite(Long id) {
	        Niveau_criticite Niveau_criticite = Niveau_criticiteRepo.findById(id).orElseThrow(() -> new RuntimeException("Niveau_criticite not found"));
	        Niveau_criticiteRepo.delete(Niveau_criticite);
	    }
}
