package com.info.controller;

import java.util.Date;
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

import com.info.entities.Ville;
import com.info.service.VilleService;


@RestController
@RequestMapping("/api/ville")
public class VilleController {

	private final VilleService villeService;

	public VilleController(VilleService villeService) {
		this.villeService = villeService;
	}

	@GetMapping
	public ResponseEntity<List<Ville>> getAllProjets() {
		List<Ville> projets = villeService.getAllVilles();
		return ResponseEntity.ok(projets);
	}

	// Get a projet by ID
	@GetMapping("/{id}")
	public ResponseEntity<Ville> getProjetById(@PathVariable Long id) {
		Ville projet = villeService.getVilleById(id);
		return ResponseEntity.ok(projet);
	}
	
	// Get a projet by name
	@GetMapping("/projetbyname/{name}")
	public ResponseEntity<Ville> getProjetByName(@PathVariable String name) {
		Ville projet = villeService.getVilleByNom(name);
		return ResponseEntity.ok(projet);
	}

	//  Create a new projet
	  @PostMapping 
	  public ResponseEntity<Ville>createProjet(@RequestBody Ville ville) {
		  ville.setDate_creation_ville(new Date());
		  	Ville createdProjet = villeService.createVille(ville); 
	  return ResponseEntity.ok(createdProjet); }
	 

	// Update a projet
	@PutMapping("/{id}")
	public ResponseEntity<Ville> updateProjet(@PathVariable Long id,
			@RequestBody Ville ville) {
		Ville updatedProjet = villeService.updateVille(id, ville);
		return ResponseEntity.ok(updatedProjet);
	}

	// Delete a projet
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProjet(@PathVariable Long id) {
		villeService.deleteVille(id);
		return ResponseEntity.noContent().build();
	}

}
