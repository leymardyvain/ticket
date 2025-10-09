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

import com.info.entities.Societe;
import com.info.service.SocieteService;

@RestController
@RequestMapping("/api/societe")
public class SocieteController {

	private final SocieteService societeService;

	public SocieteController(SocieteService societeService) {
		this.societeService = societeService;
	}

	@GetMapping
	public ResponseEntity<List<Societe>> getAllSocietes() {
		List<Societe> societes = societeService.getAllSocietes();
		return ResponseEntity.ok(societes);
	}

	// Get a societe by ID
	@GetMapping("/{id}")
	public ResponseEntity<Societe> getSocieteById(@PathVariable Long id) {
		Societe societe = societeService.getSocieteById(id);
		return ResponseEntity.ok(societe);
	}

	@GetMapping("/societebyname/{name}")
	public ResponseEntity<Societe> getSocieteByName(@PathVariable String name) {
		Societe societe = societeService.getSocieteByNom(name);
		return ResponseEntity.ok(societe);
	}
	
	@GetMapping("/ville/{name}")
	public ResponseEntity<List<Societe>> getSocieteByVilleName(@PathVariable String name) {
		List<Societe> societe = societeService.getSocieteByNomVille(name);
		return ResponseEntity.ok(societe);
	}

	@PostMapping
	public ResponseEntity<Societe> createSociete(@RequestBody Societe societe) {
		Societe createdSociete = societeService.createSociete(societe);
		return ResponseEntity.ok(createdSociete);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Societe> updateSociete(@PathVariable Long id, @RequestBody Societe societe) {
		Societe updatedSociete = societeService.updateSociete(id, societe);
		return ResponseEntity.ok(updatedSociete);
	}

	// Delete a societe
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteSociete(@PathVariable Long id) {
		societeService.deleteSociete(id);
		return ResponseEntity.noContent().build();
	}

}
