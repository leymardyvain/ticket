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

import com.info.entities.Personnel;
import com.info.service.PersonnelService;


@RestController
@RequestMapping("/api/personnel")
public class PersonnelController {

	private final PersonnelService personnelService;

	public PersonnelController(PersonnelService personnelService) {
		this.personnelService = personnelService;
	}

	@GetMapping
	public ResponseEntity<List<Personnel>> getAllPersonnels() {
		List<Personnel> personnels = personnelService.getAllPersonnels();
		return ResponseEntity.ok(personnels);
	}

	// Get a personnel by ID
	@GetMapping("/{id}")
	public ResponseEntity<Personnel> getPersonnelById(@PathVariable Long id) {
		Personnel personnel = personnelService.getPersonnelById(id);
		return ResponseEntity.ok(personnel);
	}
	
	// Get a personnel by name
	@GetMapping("/personnelbynom_societe/{username}")
	public ResponseEntity<Personnel> getPersonnelByName(@PathVariable String username) {
		Personnel personnel = personnelService.getPersonnelByUserUsername(username);
		return ResponseEntity.ok(personnel);
	}
	
	// Get a personnel by nom societe
	@GetMapping("/listpersonnelbynom_societe")
	public ResponseEntity<List<Personnel>> getListPersonnelByNomSociete () {
		List<Personnel> personnel = personnelService.getPersonnelByNom_societe();
		return ResponseEntity.ok(personnel);
	}
	
	@GetMapping("/listallpersonnelbynom_societe/{assignateur}")
	public ResponseEntity<List<Personnel>> getListAllPersonnelByNomSociete (@PathVariable String assignateur) {
		List<Personnel> personnel = personnelService.getAllPersonnelByNom_societe(assignateur);
		return ResponseEntity.ok(personnel);
	}
	
	@GetMapping("/listallpersonnelAssignateur")
	public ResponseEntity<List<Personnel>> getListAllPersonnelByAssignateur() {
		List<Personnel> personnel = personnelService.getPersonnelBAsRoleSupervisor();
		return ResponseEntity.ok(personnel);
	}
	
	@GetMapping("/listallpersonnelEnCharge")
	public ResponseEntity<List<Personnel>> getListAllPersonnelEnCharge() {
		List<Personnel> personnel = personnelService.getPersonnelByNom_societe();
		return ResponseEntity.ok(personnel);
	}
	
	// Get a personnel by nom personnel
	@GetMapping("/personnelByNomPersonne/{nomPersonnel}")
	public ResponseEntity<Personnel> getListPersonnelByNomPersonnel (@PathVariable String nomPersonnel) {
		Personnel personnel = personnelService.getPersonnelBynomPersonnel(nomPersonnel);
		return ResponseEntity.ok(personnel);
	}
	
	@GetMapping("/personnelByUsername/{username}")
	public ResponseEntity<Personnel> getListPersonnelByUsername(@PathVariable String username) {
		Personnel personnel = personnelService.getPersonnelByUserUsername(username);
		return ResponseEntity.ok(personnel);
	}

	//  Create a new personnel
	  @PostMapping 
	  public ResponseEntity<Personnel>createPersonnel(@RequestBody Personnel personnel) {
		  	Personnel createdPersonnel = personnelService.createPersonnel(personnel); 
	  return ResponseEntity.ok(createdPersonnel); }
	 

	// Update a personnel
	@PutMapping("/{id}")
	public ResponseEntity<Personnel> updatePersonnel(@PathVariable Long id,
			@RequestBody Personnel personnel) {
		Personnel updatedPersonnel = personnelService.updatePersonnel(id, personnel);
		return ResponseEntity.ok(updatedPersonnel);
	}

	// Delete a personnel
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePersonnel(@PathVariable Long id) {
		personnelService.deletePersonnel(id);
		return ResponseEntity.noContent().build();
	}

}
