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

import com.info.entities.Niveau_criticite;
import com.info.service.Niveau_criticiteService;


@RestController
@RequestMapping("/api/niveau_criticite")
public class TypeNiveau_criticiteController {

	private final Niveau_criticiteService niveau_criticiteService;

	public TypeNiveau_criticiteController(Niveau_criticiteService niveau_criticiteService) {
		this.niveau_criticiteService = niveau_criticiteService;
	}

	@GetMapping
	public ResponseEntity<List<Niveau_criticite>> getAllNiveau_criticites() {
		List<Niveau_criticite> niveau_criticites = niveau_criticiteService.getAllNiveau_criticites();
		return ResponseEntity.ok(niveau_criticites);
	}

	// Get a niveau_criticite by ID
	@GetMapping("/{id}")
	public ResponseEntity<Niveau_criticite> getNiveau_criticiteById(@PathVariable Long id) {
		Niveau_criticite niveau_criticite = niveau_criticiteService.getNiveau_criticiteById(id);
		return ResponseEntity.ok(niveau_criticite);
	}
	
	// Get a niveau_criticite by name
	@GetMapping("/niveau_criticitebyname/{name}")
	public ResponseEntity<Niveau_criticite> getNiveau_criticiteByName(@PathVariable String name) {
		Niveau_criticite niveau_criticite = niveau_criticiteService.getNiveau_criticiteByNom(name);
		return ResponseEntity.ok(niveau_criticite);
	}

	//  Create a new niveau_criticite
	  @PostMapping 
	  public ResponseEntity<Niveau_criticite>createNiveau_criticite(@RequestBody Niveau_criticite niveau_criticite) {
		  	Niveau_criticite createdNiveau_criticite = niveau_criticiteService.createNiveau_criticite(niveau_criticite); 
	  return ResponseEntity.ok(createdNiveau_criticite); }
	 

	// Update a niveau_criticite
	@PutMapping("/{id}")
	public ResponseEntity<Niveau_criticite> updateNiveau_criticite(@PathVariable Long id,
			@RequestBody Niveau_criticite niveau_criticite) {
		Niveau_criticite updatedNiveau_criticite = niveau_criticiteService.updateNiveau_criticite(id, niveau_criticite);
		return ResponseEntity.ok(updatedNiveau_criticite);
	}

	// Delete a niveau_criticite
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteNiveau_criticite(@PathVariable Long id) {
		niveau_criticiteService.deleteNiveau_criticite(id);
		return ResponseEntity.noContent().build();
	}

}
