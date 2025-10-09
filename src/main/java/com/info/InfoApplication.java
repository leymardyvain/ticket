package com.info;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.info.access.Role;
import com.info.access.User;
import com.info.entities.Etat_Ticket;
import com.info.entities.Niveau_criticite;
import com.info.entities.Type_Ticket;
import com.info.service.Etat_TicketService;
import com.info.service.Niveau_criticiteService;
import com.info.service.PersonnelService;
import com.info.service.Type_TicketService;
import com.info.service.UserService;



@SpringBootApplication
public class InfoApplication {

	public static void main(String[] args) {
		SpringApplication.run(InfoApplication.class, args);
	}
	
	@Bean
	CommandLineRunner run (UserService userService, PersonnelService personnelService, 
			Niveau_criticiteService niveau_criticiteService, Type_TicketService type_TicketService, Etat_TicketService etat_TicketService) {
		return args -> {
			
			List<Role> list = userService.getAllRole();
			
			if(list.size() <= 0) {
				
				userService.saveRole(new Role(null, "ROLE_USER"));
				userService.saveRole(new Role(null, "ROLE_ADMIN"));
				userService.saveRole(new Role(null, "ROLE_SUPERVISEUR"));
				
				niveau_criticiteService.createNiveau_criticite(new Niveau_criticite(null, "Majeur"));
				niveau_criticiteService.createNiveau_criticite(new Niveau_criticite(null, "Moyen"));
				niveau_criticiteService.createNiveau_criticite(new Niveau_criticite(null, "Faible"));
				
				type_TicketService.createType_Ticket(new Type_Ticket(null, "Incident"));
				type_TicketService.createType_Ticket(new Type_Ticket(null, "Demande"));
				
				etat_TicketService.createEtat_Ticket(new Etat_Ticket(null, "En attente assignation"));
				etat_TicketService.createEtat_Ticket(new Etat_Ticket(null, "Assigné"));
				etat_TicketService.createEtat_Ticket(new Etat_Ticket(null, "En cours résolution"));
				etat_TicketService.createEtat_Ticket(new Etat_Ticket(null, "Résolu"));
				etat_TicketService.createEtat_Ticket(new Etat_Ticket(null, "Fermé"));
				
				userService.saveUser(new User(null, "Admin","admin","admin",new ArrayList<>()));
				
				userService.addRoleToUser("admin", "ROLE_USER");
				userService.addRoleToUser("admin", "ROLE_ADMIN");
				
			}

			/**
			
			userService.saveUser(new User(null, "John Yvain","john","1234",new ArrayList<>()));
			User userdto1 = userService.getUser("john");
			techService.createTechnicien(new TechnicienDTO(null,"John Yvain",userdto1));
			
			userService.saveUser(new User(null, "Leymard Milembolo","leymard","1234",new ArrayList<>()));
			User userdto2 = userService.getUser("leymard");
			techService.createTechnicien(new TechnicienDTO(null,"Leymard Milembolo",userdto2));
			
			userService.saveUser(new User(null, "Albris Mababiri","albris","1234",new ArrayList<>()));
			User userdto3 = userService.getUser("albris");
			techService.createTechnicien(new TechnicienDTO(null,"Albris Mababiri",userdto3));
			
			userService.saveUser(new User(null, "Samuel Ardy","samy","1234",new ArrayList<>()));
			User userdto4 = userService.getUser("samy");
			techService.createTechnicien(new TechnicienDTO(null,"Samuel Ardy",userdto4));
			
			clientService.createClient(new ClientDTO(null,"MTN"));
			clientService.createClient(new ClientDTO(null,"Airtel"));
			clientService.createClient(new ClientDTO(null,"SNPC"));
			clientService.createClient(new ClientDTO(null,"E2C"));
			
			userService.addRoleToUser("john", "ROLE_USER");
			userService.addRoleToUser("leymard", "ROLE_USER");
			userService.addRoleToUser("albris", "ROLE_USER");
			userService.addRoleToUser("samy", "ROLE_USER");
			userService.addRoleToUser("Leymard", "ROLE_ADMIN");
			
			
			**/

		};
	} 

}
