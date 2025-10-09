package com.info.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.info.access.Role;
import com.info.access.User;
import com.info.entities.UpdatePassword;
import com.info.repo.RoleRepo;
import com.info.repo.UserRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

	private final UserRepo userRepo;

	private final RoleRepo roleRepo;

	private final BCryptPasswordEncoder passwordencoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepo.findByUsername(username);
		if (user == null) {
			log.error("Utilisateur n'est pas dans la base ");
			throw new UsernameNotFoundException("Utilisateur n'est pas dans la base");
		} else {
			log.info("l'Utilisateur {} existe dans la base " + username);
		}

		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(role -> {
			authorities.add(new SimpleGrantedAuthority(role.getRole_name()));
		});

		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				authorities);
	}
	
	public User saveUser(User user) {
		log.info("Nouvel utilisateur {} créé dans la base " + user.getName());
		user.setPassword(passwordencoder.encode(user.getPassword()));
		return userRepo.save(user);
	}
	
	/*public UserDTO saveUser(UserDTO user) {
		log.info("Nouvel utilisateur {} créé dans la base " + user.getName());
		user.setPassword(passwordencoder.encode(user.getPassword()));
		return userRepo.save(user);
	}*/

	public Role saveRole(Role role) {
		log.info("Nouveau role {} créé dans la base " + role.getRole_name());
		return roleRepo.save(role);
	}

	public void addRoleToUser(String username, String role_name) {
		log.info("Ajout  role {} a l'utilisateur {} " + role_name, username);
		User user = userRepo.findByUsername(username);
		Role role = roleRepo.findByRole(role_name);
		user.getRoles().add(role);
	}
	
	public void deleteRoleToUser(String username, String role_name) {
		log.info("Ajout  role {} a l'utilisateur {} " + role_name, username);
		User user = userRepo.findByUsername(username);
		Role role = roleRepo.findByRole(role_name);
		user.getRoles().remove(role);
	}

	public User getUser(String username) {
		log.info("Recherche utilisateur {} " + username);
		System.out.println("username "+username);
		return userRepo.findByUsername(username);
	}
	
	public Role getRole(String roleName) {
		log.info("Recherche role {} " + roleName);
		System.out.println("roleName "+roleName);
		return roleRepo.findByRole(roleName);
	}
	
	public List<Role> getAllRole() {
		log.info("list all role {} ");
		return roleRepo.findAll();
	}
	
	public List<User> getAllUser() {
		log.info("list all user sauf admin");
		List<User> listUser = userRepo.findAll();
		
		List<User> listFinalUser = new ArrayList<User>();
		
		for(User user : listUser) {
			
			if(!user.getUsername().equals("admin")) {
				listFinalUser.add(user);			}
			
		}
		
		return listFinalUser;
	}

	public List<User> getUsers() {
		log.info("list tous les utilisateurs sauf admin");
		List<User> listUser = userRepo.findAll();
		
		List<User> listFinalUser = new ArrayList<User>();
		
		for(User user : listUser) {
			
			if(!user.getUsername().equals("admin")) {
				listFinalUser.add(user);			}
			
		}
		
		return listFinalUser;
	}

	public void updatePassword(UpdatePassword updatepassword) {
		User existingUser = userRepo.findByUsername(updatepassword.getUsername());
		existingUser.setPassword(passwordencoder.encode(updatepassword.getPwd()));
		userRepo.save(existingUser);
	}

}
