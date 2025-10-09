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

import com.info.entities.Departement;
import com.info.service.DepartementService;


@RestController
@RequestMapping("/api/departement")
public class DepartementController {

	private final DepartementService departementService;

	public DepartementController(DepartementService departementService) {
		this.departementService = departementService;
	}

	@GetMapping
	public ResponseEntity<List<Departement>> getAllDepartements() {
		List<Departement> departements = departementService.getAlldepartements();
		return ResponseEntity.ok(departements);
	}

	// Get a departement by ID
	@GetMapping("/{id}")
	public ResponseEntity<Departement> getDepartementById(@PathVariable Long id) {
		Departement departement = departementService.getdepartementById(id);
		return ResponseEntity.ok(departement);
	}
	
	// Get a departement by name
	@GetMapping("/departementbyname/{name}")
	public ResponseEntity<Departement> getDepartementByName(@PathVariable String name) {
		Departement departement = departementService.getdepartementByNom(name);
		return ResponseEntity.ok(departement);
	}
	
	@GetMapping("/societe/{name}")
	public ResponseEntity<List<Departement>> getDepartementByNameSociete(@PathVariable String name) {
		List<Departement> departement = departementService.getdepartementByNomSociete(name);
		return ResponseEntity.ok(departement);
	}

	//  Create a new departement
	  @PostMapping 
	  public ResponseEntity<Departement>createDepartement(@RequestBody Departement departement) {
		  	Departement createdDepartement = departementService.createdepartement(departement); 
	  return ResponseEntity.ok(createdDepartement); }
	 

	// Update a departement
	@PutMapping("/{id}")
	public ResponseEntity<Departement> updateDepartement(@PathVariable Long id,
			@RequestBody Departement departement) {
		Departement updatedDepartement = departementService.updatedepartement(id, departement);
		return ResponseEntity.ok(updatedDepartement);
	}

	// Delete a departement
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDepartement(@PathVariable Long id) {
		departementService.deletedepartement(id);
		return ResponseEntity.noContent().build();
	}

}
