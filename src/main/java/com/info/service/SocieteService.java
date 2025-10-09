package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Societe;
import com.info.repo.SocieteRepo;



@Service
public class SocieteService {
	
	  private final SocieteRepo SocieteRepo;
	  
	  public SocieteService(SocieteRepo SocieteRepo) {
	      this.SocieteRepo = SocieteRepo;
	  }
	  

	    public List<Societe> getAllSocietes() {
	        return SocieteRepo.findAll();
	    }

	    public Societe getSocieteById(Long id) {
	        Societe Societe = SocieteRepo.findById(id).orElseThrow(() -> new RuntimeException("Societe not found"));
	        return Societe;
	    }
	    
	    public Societe getSocieteByNom(String name) {
	        Societe Societe = SocieteRepo.findSocieteByNomSociete(name);
	        return Societe;
	    }
	    
	    public List<Societe> getSocieteByNomVille(String name) {
	        List<Societe> Societe = SocieteRepo.findSocieteByNomVille(name);
	        return Societe;
	    }

	    public Societe createSociete(Societe Societe) {
	    	return SocieteRepo.save(Societe);
	    }

	    public Societe updateSociete(Long id, Societe Societe) {
	        Societe existingSociete = SocieteRepo.findById(id).orElseThrow(() -> new RuntimeException("Societe not found"));
	        existingSociete.setNom_societe(Societe.getNom_societe());
	        return SocieteRepo.save(existingSociete);
	         
	    }

	    public void deleteSociete(Long id) {
	        Societe Societe = SocieteRepo.findById(id).orElseThrow(() -> new RuntimeException("Societe not found"));
	        SocieteRepo.delete(Societe);
	    }
}
