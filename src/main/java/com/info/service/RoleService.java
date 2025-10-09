package com.info.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.info.access.Role;
import com.info.repo.RoleRepo;



@Service
public class RoleService {
	
	  private final RoleRepo RoleRepo;
	  
	  public RoleService(RoleRepo RoleRepo) {
	      this.RoleRepo = RoleRepo;
	  }
	  

	    public List<Role> getAllRoles() {
	        return RoleRepo.findAll();
	    }

	    public Role getRoleById(Long id) {
	        Role Role = RoleRepo.findById(id).orElseThrow(() -> new RuntimeException("Role not found"));
	        return Role;
	    }
	    
	    public Role getRoleByNom(String name) {
	        Role Role = RoleRepo.findByRole(name);
	        return Role;
	    }

	    public Role createRole(Role Role) {
	    	return RoleRepo.save(Role);
	    }

	    public Role updateRole(Long id, Role Role) {
	        Role existingRole = RoleRepo.findById(id).orElseThrow(() -> new RuntimeException("Role not found"));
	        existingRole.setRole_name(Role.getRole_name());
	        return RoleRepo.save(existingRole);
	         
	    }

	    public void deleteRole(Long id) {
	        Role Role = RoleRepo.findById(id).orElseThrow(() -> new RuntimeException("Role not found"));
	        RoleRepo.delete(Role);
	    }
}
