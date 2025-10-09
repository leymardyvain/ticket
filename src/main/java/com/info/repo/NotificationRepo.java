package com.info.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.entities.Notification;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {

	@Query("select u from Notification u where u.personnel_concerne.user.username= :username AND u.isreading=false ORDER BY id_notification DESC")
	List<Notification> findNotificationByUsername(String username);
	
	@Query("select u from Notification u where u.suivi_Ticket.Id_suivi_Ticket= :Id_suivi_Ticket AND u.code= :code AND u.type= :type AND u.isreading=false ORDER BY id_notification DESC")
	Notification findNotificationByIdSuivi_TicketAndCode(Long Id_suivi_Ticket, String code, String type);
	
	@Query("select u from Notification u where u.suivi_Ticket.etat_Ticket.nom_etat_Ticket= 'En attente assignation' AND u.suivi_Ticket.Id_suivi_Ticket= :Id_suivi_Ticket AND u.isreading=false ORDER BY id_notification DESC")
	Notification findNotificationByEn_attente_assignation(Long Id_suivi_Ticket);
	
	@Query("select u from Notification u where u.suivi_Ticket.etat_Ticket.nom_etat_Ticket= 'Assigné' AND u.suivi_Ticket.Id_suivi_Ticket= :Id_suivi_Ticket AND u.isreading=false ORDER BY id_notification DESC")
	Notification findNotificationByAssigné(Long Id_suivi_Ticket);
	
	@Query("select u from Notification u where u.suivi_Ticket.etat_Ticket.nom_etat_Ticket= 'En cours résolution' AND u.suivi_Ticket.Id_suivi_Ticket= :Id_suivi_Ticket AND u.isreading=false ORDER BY id_notification DESC")
	Notification findNotificationByEn_cours_résolution(Long Id_suivi_Ticket);
	
	@Query("select u from Notification u where u.suivi_Ticket.etat_Ticket.nom_etat_Ticket= 'Résolu' AND u.suivi_Ticket.Id_suivi_Ticket= :Id_suivi_Ticket AND u.isreading=false ORDER BY id_notification DESC")
	Notification findNotificationByRésolu(Long Id_suivi_Ticket);
	
	@Query("select u from Notification u where u.suivi_Ticket.etat_Ticket.nom_etat_Ticket= 'Fermé' AND u.suivi_Ticket.Id_suivi_Ticket= :Id_suivi_Ticket AND u.isreading=false ORDER BY id_notification DESC")
	Notification findNotificationByFermé(Long Id_suivi_Ticket);
}


