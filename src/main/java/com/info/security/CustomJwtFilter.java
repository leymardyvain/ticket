package com.info.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static java.util.Arrays.stream;

@Slf4j
public class CustomJwtFilter extends OncePerRequestFilter {

	private static String secretKey = "JobSpringBoot@123";

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
			
		if (request.getServletPath().contains("/api/login") ||
				request.getServletPath().contains("/api/token/refreshtoken") 
				|| request.getServletPath().contains("/assets") 
				|| request.getServletPath().contains("/pages/login")
				|| request.getServletPath().contains("/")
				|| request.getServletPath().contains("/index.html")) {

			filterChain.doFilter(request, response);
			
		} else {

			String authorizationHeader = request.getHeader(AUTHORIZATION);

			String message_error = "Connexion sans JWT";

			if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

				try {

					String token = authorizationHeader.substring("Bearer ".length());
					
					Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());
					
					JWTVerifier verifier = JWT.require(algorithm).build();
					
					DecodedJWT decodeJWT = verifier.verify(token);
					
					String username = decodeJWT.getSubject();

					String[] roles = decodeJWT.getClaim("roles").asArray(String.class);

					Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

					stream(roles).forEach(role -> {
						authorities.add(new SimpleGrantedAuthority(role));
					});

					UsernamePasswordAuthenticationToken authiAuthenticationToken = new UsernamePasswordAuthenticationToken(
							username, null, authorities);
					SecurityContextHolder.getContext().setAuthentication(authiAuthenticationToken);

					filterChain.doFilter(request, response);

				} catch (Exception e) {

					log.error("Error logging in : {}", e.getMessage());

					response.setHeader("error", e.getMessage());

					response.setStatus(FORBIDDEN.value());

					Map<String, Object> error = new HashMap<>();

					error.put("timestamp", Calendar.getInstance().getTime());
					
					error.put("error_message", e.getMessage());

					response.setContentType(APPLICATION_JSON_VALUE);

					new ObjectMapper().writeValue(response.getOutputStream(), error);

				}
			} else {
				
				response.setStatus(HttpStatus.BAD_REQUEST.value());
				
				Map<String, Object> data = new HashMap<>();
				
				data.put("timestamp", Calendar.getInstance().getTime());
				
				data.put("exception", message_error);
				
				response.setContentType(APPLICATION_JSON_VALUE);
				
				new ObjectMapper().writeValue(response.getOutputStream(), data);
				
			}
		}
	}
}
