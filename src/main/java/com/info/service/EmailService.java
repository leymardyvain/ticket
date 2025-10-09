package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Email;
import com.info.entities.Personnel;
import com.info.repo.EmailRepo;



@Service
public class EmailService {
	
	  private final EmailRepo EmailRepo;
	  
	  public EmailService(EmailRepo EmailRepo) {
	      this.EmailRepo = EmailRepo;
	  }
	  

	    public List<Email> getAllEmails() {
	        return EmailRepo.findAll();
	    }

	    public Email getEmailById(Long id) {
	        Email Email = EmailRepo.findById(id).orElseThrow(() -> new RuntimeException("Email not found"));
	        return Email;
	    }
	    
	    public Email getEmailByNom(String name) {
	        Email Email = EmailRepo.findEmailByLibelleEmail(name);
	        return Email;
	    }

	    public Email createEmail(Email Email) {
	    	return EmailRepo.save(Email);
	    }

	    public Email updateEmail(Long id, Email Email, Personnel personnel) {
	        Email existingEmail = EmailRepo.findById(id).orElseThrow(() -> new RuntimeException("Email not found"));
	        existingEmail.setLibelle_email(Email.getLibelle_email());
	        existingEmail.setPersonnel(personnel);
	        return EmailRepo.save(existingEmail);
	         
	    }

	    public void deleteEmail(Long id) {
	        Email Email = EmailRepo.findById(id).orElseThrow(() -> new RuntimeException("Email not found"));
	        EmailRepo.delete(Email);
	    }
}
