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

import com.info.access.Role;
import com.info.service.RoleService;


@RestController
@RequestMapping("/api/role")
public class RoleController {

	private final RoleService roleService;

	public RoleController(RoleService roleService) {
		this.roleService = roleService;
	}

	@GetMapping
	public ResponseEntity<List<Role>> getAllRoles() {
		List<Role> roles = roleService.getAllRoles();
		return ResponseEntity.ok(roles);
	}

	// Get a role by ID
	@GetMapping("/{id}")
	public ResponseEntity<Role> getRoleById(@PathVariable Long id) {
		Role role = roleService.getRoleById(id);
		return ResponseEntity.ok(role);
	}
	
	// Get a role by name
	@GetMapping("/rolebyname/{name}")
	public ResponseEntity<Role> getRoleByName(@PathVariable String name) {
		Role role = roleService.getRoleByNom(name);
		return ResponseEntity.ok(role);
	}

	//  Create a new role
	  @PostMapping 
	  public ResponseEntity<Role>createRole(@RequestBody Role role) {
		  	Role createdRole = roleService.createRole(role); 
	  return ResponseEntity.ok(createdRole); }
	 

	// Update a role
	@PutMapping("/{id}")
	public ResponseEntity<Role> updateRole(@PathVariable Long id,
			@RequestBody Role role) {
		Role updatedRole = roleService.updateRole(id, role);
		return ResponseEntity.ok(updatedRole);
	}

	// Delete a role
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
		roleService.deleteRole(id);
		return ResponseEntity.noContent().build();
	}

}
