package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Cisco;
import com.info.entities.Personnel;
import com.info.repo.CiscoRepo;



@Service
public class CiscoService {
	
	  private final CiscoRepo CiscoRepo;
	  
	  public CiscoService(CiscoRepo CiscoRepo) {
	      this.CiscoRepo = CiscoRepo;
	  }
	  

	    public List<Cisco> getAllCiscos() {
	        return CiscoRepo.findAll();
	    }

	    public Cisco getCiscoById(Long id) {
	        Cisco Cisco = CiscoRepo.findById(id).orElseThrow(() -> new RuntimeException("Cisco not found"));
	        return Cisco;
	    }
	    
	    public Cisco getCiscoByNom(String name) {
	        Cisco Cisco = CiscoRepo.findCiscoByNumeroCisco(name);
	        return Cisco;
	    }

	    public Cisco createCisco(Cisco Cisco) {
	    	return CiscoRepo.save(Cisco);
	    }

	    public Cisco updateCisco(Long id, Cisco Cisco, Personnel personnel) {
	        Cisco existingCisco = CiscoRepo.findById(id).orElseThrow(() -> new RuntimeException("Cisco not found"));
	        existingCisco.setNumero_cisco(Cisco.getNumero_cisco());
	        existingCisco.setPersonnel(personnel);
	        return CiscoRepo.save(existingCisco);
	         
	    }

	    public void deleteCisco(Long id) {
	        Cisco Cisco = CiscoRepo.findById(id).orElseThrow(() -> new RuntimeException("Cisco not found"));
	        CiscoRepo.delete(Cisco);
	    }
}
