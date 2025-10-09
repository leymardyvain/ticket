package com.info.controller;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.io.IOException;
import java.net.URI;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.info.access.Role;
import com.info.access.User;
import com.info.entities.AddRoleToUserDTO;
import com.info.entities.Personnel;
import com.info.entities.UpdatePassword;
import com.info.form.FormData;
import com.info.service.PersonnelService;
import com.info.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class userController {

	private final UserService userService;
	
	private final PersonnelService personnelService;
	
	private static String secretKey = "JobSpringBoot@123";

	@GetMapping("/getuserByUsername/{username}")
	public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
		System.out.println("username "+username);
		return ResponseEntity.ok().body(userService.getUser(username));
	}
	
	@GetMapping("/getroleByRoleName/{roleName}")
	public ResponseEntity<Role> getRoleByName(@PathVariable String roleName) {
		System.out.println("roleName "+roleName);
		return ResponseEntity.ok().body(userService.getRole(roleName));
	}
	
	@GetMapping("/getAllRole")
	public ResponseEntity<List<Role>> getAllRole() {
		return ResponseEntity.ok().body(userService.getAllRole());
	}
	
	@GetMapping("/getAllUser")
	public ResponseEntity<List<User>> getAllUser() {
		return ResponseEntity.ok().body(userService.getAllUser());
	}
	
	@GetMapping("/getAllPersonnel")
	public ResponseEntity<List<Personnel>> getAllPersonnel() {
		return ResponseEntity.ok().body(personnelService.getAllPersonnels());
	}

	@PostMapping("/user/save")
	public ResponseEntity<Object> saveUser(@RequestBody FormData formData) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/user/save").toUriString());
		List<User> list_user = userService.getUsers();
		
		boolean find = false;
		
		for(User user_check : list_user) {
			if(user_check.getUsername().equals(formData.getUser().getUsername())) {
				find = true;	
			}	
		}
		
		if(find) {
			return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .body("Utilisateur avec ce username existe dans la base !");
		}else {
			User createUser = userService.saveUser(formData.getUser());
			User recupUserCreated = userService.getUser(createUser.getUsername());
			Personnel newPersonnel = new Personnel();
			newPersonnel.setNom_personnel(formData.getNom_personnel());
			newPersonnel.setUser(recupUserCreated);
			newPersonnel.setIs_delete(formData.getIs_delete());
			newPersonnel.setDepartement(formData.getDepartement());
			
			for(String list : formData.getRoles()) {
				userService.addRoleToUser(recupUserCreated.getUsername(), list);	
			}
			
			personnelService.createPersonnel(newPersonnel);
			
			System.out.println("nom utilisateur "+formData.getNom_personnel());
			
			System.out.println("departement "+formData.getDepartement().getNom_departement());
			
			for(String list : formData.getRoles()) {
				System.out.println("role "+list);
			}
			
			System.out.println("name "+formData.getUser().getName());
			System.out.println("username "+formData.getUser().getUsername());
			System.out.println("password "+formData.getUser().getPassword());
			
			return ResponseEntity.created(uri).body(formData.getUser());
		}
		
		
	}

	@PostMapping("/role/save")
	public ResponseEntity<Role> saveRole(@RequestBody Role role) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/role/save").toUriString());
		return ResponseEntity.created(uri).body(userService.saveRole(role));
	}

	@PostMapping("/role/addtouser")
	public ResponseEntity<?> AddRoleToUser(@RequestBody AddRoleToUserDTO addRoleToUserdto) {
		
		User user_check = userService.getUser(addRoleToUserdto.getUsername());
		
		Boolean find = false;
		
		find = false;
			
		for(Role role : user_check.getRoles()) {
				
			if(role.getRole_name().equals("ROLE_ADMIN")) {
				find = true;
				break;
			}
			
		}
		
		if(find) {
			return 
					ResponseEntity
		            .status(HttpStatus.FORBIDDEN)
		            .body("Utilisateur dispose déjà de ce rôle !");
		}
		else {
			userService.addRoleToUser(addRoleToUserdto.getUsername(), addRoleToUserdto.getRoleName());
			System.out.println("added");
		}
		
		//
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/role/deletetouser")
	public ResponseEntity<?> DeleteRoleToUser(@RequestBody AddRoleToUserDTO addRoleToUserdto) {
		
		User user_check = userService.getUser(addRoleToUserdto.getUsername());
		
		Boolean find = false;
		
		find = false;
			
		for(Role role : user_check.getRoles()) {
				
			if(role.getRole_name().equals("ROLE_ADMIN")) {
				find = true;
				break;
			}
			
		}
		
		if(find) {
			System.out.println("dans find");
			List<User> list_user = userService.getUsers();
			
			boolean findAdminRole = false;
			
			for(User user_chec : list_user) {
				
				Collection<Role> roles = user_chec.getRoles();
				
				for(Role ro : roles) {
					
					if(ro.getRole_name().equals("ROLE_ADMIN") && !user_chec.equals(user_check)) {
						System.out.println("dans condition ");
						findAdminRole = true;
						break;
					}
				}
			}
			
			if(findAdminRole) {
				userService.deleteRoleToUser(addRoleToUserdto.getUsername(), addRoleToUserdto.getRoleName());
				return 
						ResponseEntity
			            .status(HttpStatus.OK)
			            .body("Utilisateur ne dispose plus du rôle admin !");
			}
			else {
				ResponseEntity
	            .status(HttpStatus.FORBIDDEN)
	            .body("impossible, vous ne displosez plus d'utilisateurs ayant de rôle admin !");
			}
			
		}
		
		return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body("Aucun rôle admin trouvé ! ");
	}

	@GetMapping("/token/refreshtoken")
	public void RefreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		String authorizationHeader = request.getHeader(AUTHORIZATION);
		
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			
			try {

				String refresh_token = authorizationHeader.substring("Bearer ".length());
				
				Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());
				
				JWTVerifier verifier = JWT.require(algorithm).build();
	
				DecodedJWT decodeJWT = verifier.verify(refresh_token);
				
				String username = decodeJWT.getSubject();

				User user = userService.getUser(username);

				String access_token = JWT.create().withSubject(user.getUsername())
						.withExpiresAt(new Date(System.currentTimeMillis() + 1440 * 60 * 1000))
						.withIssuer(request.getRequestURL().toString())
						.withClaim("roles",
								user.getRoles().stream().map(Role::getRole_name).collect(Collectors.toList()))
						.sign(algorithm);

				Map<String, String> tokens = new HashMap<>();
				
				tokens.put("access_token", access_token);
				
				tokens.put("refresh_token", refresh_token);
				
				response.setContentType(org.springframework.http.MediaType.APPLICATION_JSON_VALUE);
				
				new ObjectMapper().writeValue(response.getOutputStream(), tokens);
				
			} catch (Exception e) {

				response.setHeader("error", e.getMessage());

				response.setStatus(FORBIDDEN.value());

				Map<String, Object> error = new HashMap<>();

				error.put("timestamp", Calendar.getInstance().getTime());
				error.put("error_message", e.getMessage());

				response.setContentType(APPLICATION_JSON_VALUE);

				new ObjectMapper().writeValue(response.getOutputStream(), error);

			}
		} else {
			
			String message_error = "Refresh token est inaccessible";
			
			response.setStatus(HttpStatus.BAD_REQUEST.value());
			
			Map<String, Object> data = new HashMap<>();
			
			data.put("timestamp", Calendar.getInstance().getTime());
			
			data.put("exception", message_error);
			
			response.setContentType(APPLICATION_JSON_VALUE);
			
			new ObjectMapper().writeValue(response.getOutputStream(), data);
		}

	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updatePassword(@RequestBody UpdatePassword updatepassword) {
		userService.updatePassword(updatepassword);
		return ResponseEntity
	            .status(HttpStatus.OK)
	            .body("Mot de passe modifié avec succès !");
	}

}
