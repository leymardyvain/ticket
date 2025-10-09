package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Departement;
import com.info.repo.DepartementRepo;



@Service
public class DepartementService {
	
	  private final DepartementRepo departementRepo;
	  
	  public DepartementService(DepartementRepo departementRepo) {
	      this.departementRepo = departementRepo;
	  }
	  

	    public List<Departement> getAlldepartements() {
	        return departementRepo.findAll();
	    }

	    public Departement getdepartementById(Long id) {
	        Departement departement = departementRepo.findById(id).orElseThrow(() -> new RuntimeException("departement not found"));
	        return departement;
	    }
	    
	    public Departement getdepartementByNom(String name) {
	        Departement departement = departementRepo.findDepartementByNomDepartement(name);
	        return departement;
	    }
	    
	    public List<Departement>  getdepartementByNomSociete(String name) {
	        List<Departement> departement = departementRepo.findDepartementByNomSociete(name);
	        return departement;
	    }

	    public Departement createdepartement(Departement departement) {
	    	return departementRepo.save(departement);
	    }

	    public Departement updatedepartement(Long id, Departement departement) {
	        Departement existingdepartement = departementRepo.findById(id).orElseThrow(() -> new RuntimeException("departement not found"));
	        existingdepartement.setNom_departement(departement.getNom_departement());
	        return departementRepo.save(existingdepartement);
	         
	    }

	    public void deletedepartement(Long id) {
	        Departement departement = departementRepo.findById(id).orElseThrow(() -> new RuntimeException("departement not found"));
	        departementRepo.delete(departement);
	    }
}
