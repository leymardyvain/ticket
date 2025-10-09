package com.info.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.info.entities.Notification;
import com.info.service.NotificationService;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

	private final NotificationService notificationService;

	public NotificationController(NotificationService notificationService) {
		this.notificationService = notificationService;
	}

	@GetMapping
	public ResponseEntity<List<Notification>> getAllNotifications() {
		List<Notification> notifications = notificationService.getAllNotifications();
		return ResponseEntity.ok(notifications);
	}

	// Get a notification by ID
	@GetMapping("/{id}")
	public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
		Notification notification = notificationService.getNotificationById(id);
		return ResponseEntity.ok(notification);
	}

	@GetMapping("/notificationbyusername/{username}")
	public ResponseEntity<?> getNotificationBySuivi_ticketID(@PathVariable String username) {
		notificationService.getNotificationByUsername(username);
		return ResponseEntity.ok(notificationService.getNotificationByUsername(username));
	}

	// Create a new notification
	@PostMapping
	public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
		notificationService.createNotification(notification);
		return ResponseEntity.ok("Notification ajoutée avec succès ");
	}

	// Update a notification

	@PutMapping("/{id}")
	public ResponseEntity<?> updateNotification(@PathVariable Long id) {
		notificationService.updateNotification(id);
		return ResponseEntity.ok("updated");
	}

	// Delete a notification
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
		notificationService.deleteNotification(id);
		return ResponseEntity.noContent().build();
	}

}
