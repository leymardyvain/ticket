package com.info.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.info.access.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
	
	@Query("select u from Role u where u.role_name = :roleName")
	Role findByRole(String roleName);

}


