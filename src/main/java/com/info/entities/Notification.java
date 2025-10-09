package com.info.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long id_notification;
	
	@Column(name = "date_notification")
	private Date date_notification;
	
	@ManyToOne
	@JoinColumn(name = "id_personnel_concerne")
	private Personnel personnel_concerne;
	
	@ManyToOne
	@JoinColumn(name = "id_suivi_Ticket")
	private Suivi_Ticket suivi_Ticket;
	
	@Column(name = "message", columnDefinition = "TEXT")
	private String message;
	
	@Column(name = "code")
	private String code;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "isreading")
	private Boolean isreading;
	
}
