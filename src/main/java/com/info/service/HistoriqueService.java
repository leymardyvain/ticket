package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Historique;
import com.info.repo.HistoriqueRepo;



@Service
public class HistoriqueService {
	
	  private final HistoriqueRepo HistoriqueRepo;
	  
	  public HistoriqueService(HistoriqueRepo HistoriqueRepo) {
	      this.HistoriqueRepo = HistoriqueRepo;
	  }
	  

	    public List<Historique> getAllHistoriques() {
	        return HistoriqueRepo.findAll();
	    }

	    public Historique getHistoriqueById(Long id) {
	        Historique Historique = HistoriqueRepo.findById(id).orElseThrow(() -> new RuntimeException("Historique not found"));
	        return Historique;
	    }
	    
	    public Historique createHistorique(Historique Historique) {
	    	return HistoriqueRepo.save(Historique);
	    }
	    
		public List<Historique> getHistoriqueById_suivi_Ticket(Long id) {
			List<Historique> Historique = HistoriqueRepo
					.findHistoriqueByID_suivi_Ticket(id);
			return Historique;
		}
		
		public List<Historique> getHistoriqueById_personnel(String  username) {
			List<Historique> Historique = HistoriqueRepo
					.findHistoriqueByID_Personnel(username);
			return Historique;
		}

	 /*   public Historique updateHistorique(Long id, Historique Historique) {
	        Historique existingHistorique = HistoriqueRepo.findById(id).orElseThrow(() -> new RuntimeException("Historique not found"));
	        existingHistorique.setNom_historique(Historique.getNom_s);
	        return HistoriqueRepo.save(existingHistorique);
	         
	    }*/

	    public void deleteHistorique(Long id) {
	        Historique Historique = HistoriqueRepo.findById(id).orElseThrow(() -> new RuntimeException("Historique not found"));
	        HistoriqueRepo.delete(Historique);
	    }
}
