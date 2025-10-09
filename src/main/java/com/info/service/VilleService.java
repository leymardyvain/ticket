package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Ville;
import com.info.repo.VilleRepo;



@Service
public class VilleService {
	
	  private final VilleRepo VilleRepo;
	  
	  public VilleService(VilleRepo VilleRepo) {
	      this.VilleRepo = VilleRepo;
	  }
	  

	    public List<Ville> getAllVilles() {
	        return VilleRepo.findAll();
	    }

	    public Ville getVilleById(Long id) {
	        Ville Ville = VilleRepo.findById(id).orElseThrow(() -> new RuntimeException("Ville not found"));
	        return Ville;
	    }
	    
	    public Ville getVilleByNom(String name) {
	        Ville Ville = VilleRepo.findVilleByNomVille(name);
	        return Ville;
	    }

	    public Ville createVille(Ville Ville) {
	    	return VilleRepo.save(Ville);
	    }

	    public Ville updateVille(Long id, Ville Ville) {
	        Ville existingVille = VilleRepo.findById(id).orElseThrow(() -> new RuntimeException("Ville not found"));
	        existingVille.setNom_ville(Ville.getNom_ville());
	        return VilleRepo.save(existingVille);
	         
	    }

	    public void deleteVille(Long id) {
	        Ville Ville = VilleRepo.findById(id).orElseThrow(() -> new RuntimeException("Ville not found"));
	        VilleRepo.delete(Ville);
	    }
}
