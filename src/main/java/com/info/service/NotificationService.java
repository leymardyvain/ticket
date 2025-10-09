package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.entities.Notification;
import com.info.repo.NotificationRepo;



@Service
public class NotificationService {
	
	  private final NotificationRepo NotificationRepo;
	  
	  public NotificationService(NotificationRepo NotificationRepo) {
	      this.NotificationRepo = NotificationRepo;
	  }
	  

	    public List<Notification> getAllNotifications() {
	        return NotificationRepo.findAll();
	    }

	    public Notification getNotificationById(Long id) {
	        Notification Notification = NotificationRepo.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
	        return Notification;
	    }
	    
	    public Notification createNotification(Notification Notification) {
	    	return NotificationRepo.save(Notification);
	    }
	    
		public List<Notification> getNotificationByUsername(String username) {
			List<Notification> Notification = NotificationRepo.findNotificationByUsername(username);
			return Notification;
		}
		
		public Notification getNotificationByEn_attente_assignation(Long id) {
			Notification Notification = NotificationRepo.findNotificationByEn_attente_assignation(id);
			return Notification;
		}
		
		public Notification getNotificationByAssigné(Long id) {
			Notification Notification = NotificationRepo.findNotificationByAssigné(id);
			return Notification;
		}
		
		public Notification getNotificationByEn_cours_résolution(Long id) {
			Notification Notification = NotificationRepo.findNotificationByEn_cours_résolution(id);
			return Notification;
		}
		
		public Notification getNotificationByRésolu(Long id) {
			Notification Notification = NotificationRepo.findNotificationByRésolu(id);
			return Notification;
		}
		
		public Notification getNotificationByFermé(Long id) {
			Notification Notification = NotificationRepo.findNotificationByFermé(id);
			return Notification;
		}
		
		public Notification getNotificationByIdAndType(Long id, String code, String type) {
			Notification Notification = NotificationRepo.findNotificationByIdSuivi_TicketAndCode(id, code, type);
			return Notification;
		}

	    public Notification updateNotification(Long id) {
	        Notification existingNotification = NotificationRepo.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
	        if(existingNotification.getType().equals("Info")) {
	            existingNotification.setIsreading(true);
		        return NotificationRepo.save(existingNotification);
	        }
	   
	         return null;
	    }
	    	    
	    public Notification updateNotificationWithObjet(Long id, Notification notification) {
	        Notification existingNotification = NotificationRepo.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
	        existingNotification.setIsreading(true);
	        existingNotification.setCode(notification.getCode());
	        existingNotification.setDate_notification(notification.getDate_notification());
	        existingNotification.setMessage(notification.getMessage());
	        existingNotification.setPersonnel_concerne(notification.getPersonnel_concerne());
	        existingNotification.setSuivi_Ticket(notification.getSuivi_Ticket());
	        existingNotification.setType(notification.getType());
	        return NotificationRepo.save(existingNotification);
	         
	    }

	    public void deleteNotification(Long id) {
	        Notification Notification = NotificationRepo.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
	        NotificationRepo.delete(Notification);
	    }
}
