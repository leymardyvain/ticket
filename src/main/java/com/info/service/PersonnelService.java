package com.info.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.info.access.Role;
import com.info.entities.Personnel;
import com.info.repo.PersonnelRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PersonnelService {

	private final PersonnelRepo PersonnelRepo;

	public PersonnelService(PersonnelRepo PersonnelRepo) {
		this.PersonnelRepo = PersonnelRepo;
	}

	public List<Personnel> getAllPersonnels() {
		log.info("list all user sauf admin");
		List<Personnel> listPersonnel = PersonnelRepo.findAll();

		List<Personnel> listFinalUser = new ArrayList<Personnel>();

		for (Personnel personnel : listPersonnel) {

			if (!personnel.getUser().getUsername().equals("admin")) {
				listFinalUser.add(personnel);
			}

		}

		return listFinalUser;
	}
	
	public Personnel getPersonnelById(Long id) {
		Personnel Personnel = PersonnelRepo.findById(id).orElseThrow(() -> new RuntimeException("Personnel not found"));
		return Personnel;
	}

	public Personnel getPersonnelByNom(String name) {
		Personnel Personnel = PersonnelRepo.findPersonnelByNomDepartement(name);
		return Personnel;
	}

	public Personnel getPersonnelByUserUsername(String name) {
		Personnel Personnel = PersonnelRepo.findPersonnelByUserUsername(name);
		return Personnel;
	}

	public Personnel getPersonnelBynomPersonnel(String name) {
		Personnel Personnel = PersonnelRepo.findPersonnelByNomPersonnel(name);
		return Personnel;
	}

	public List<Personnel> getPersonnelByNom_societe() {
		List<Personnel> ListPersonnel = PersonnelRepo.findPersonnelByNom_societe();
		List<Personnel> newListPersonne = new ArrayList<Personnel>();
		for (Personnel pers : ListPersonnel) {

			Collection<Role> ListRoleUSer = pers.getUser().getRoles();

			boolean find = false;

			for (Role role : ListRoleUSer) {
				if (role.getRole_name().equals("ROLE_ADMIN")) {
					find = true;
					// newListPersonne.add(pers);
					// break;
				}
				if (role.getRole_name().equals("ROLE_SUPERVISEUR")) {
					find = false;
					break;
				}
			}
			if (find) {
				newListPersonne.add(pers);
			}
		}
		return newListPersonne;
	}

	public List<Personnel> getPersonnelBAsRoleSupervisor() {
		List<Personnel> ListPersonnel = PersonnelRepo.findPersonnelByNom_societe();
		List<Personnel> newListPersonne = new ArrayList<Personnel>();
		for (Personnel pers : ListPersonnel) {

			Collection<Role> ListRoleUSer = pers.getUser().getRoles();

			boolean find = false;

			for (Role role : ListRoleUSer) {
				if (role.getRole_name().equals("ROLE_SUPERVISEUR")) {
					find = true;
					break;
				}
			}
			if (find) {
				newListPersonne.add(pers);
			}
		}
		return newListPersonne;
	}
	
	public List<Personnel> getAllPersonnelByNom_societe(String assignateur) {
		List<Personnel> ListPersonnel = PersonnelRepo.findPersonnelByNom_societe();
		List<Personnel> newListPersonne = new ArrayList<Personnel>();
		Personnel recupPersonnel = PersonnelRepo.findPersonnelByUserUsername(assignateur);
		for (Personnel pers : ListPersonnel) {

			Collection<Role> ListRoleUSer = pers.getUser().getRoles();

			boolean find = false;

			for (Role role : ListRoleUSer) {
				if (role.getRole_name().equals("ROLE_ADMIN")) {
					find = true;
					// newListPersonne.add(pers);
					// break;
				}
				if (role.getRole_name().equals("ROLE_USER")) {
					find = false;
				}
				
				if(pers.getId_personnel() == recupPersonnel.getId_personnel()) {
					find = false;
				}
			}
			if (find) {
				newListPersonne.add(pers);
			}
		}
		return newListPersonne;
	}

	public Personnel createPersonnel(Personnel Personnel) {
		return PersonnelRepo.save(Personnel);
	}

	public Personnel updatePersonnel(Long id, Personnel Personnel) {
		Personnel existingPersonnel = PersonnelRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Personnel not found"));
		existingPersonnel.setNom_personnel(Personnel.getNom_personnel());
		return PersonnelRepo.save(existingPersonnel);

	}

	public void deletePersonnel(Long id) {
		Personnel Personnel = PersonnelRepo.findById(id).orElseThrow(() -> new RuntimeException("Personnel not found"));
		PersonnelRepo.delete(Personnel);
	}
}
