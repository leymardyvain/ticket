package com.info.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

	private final AuthenticationConfiguration authenticationConfiguration;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		CustomAuthenticationFilter custAuthfilter = new CustomAuthenticationFilter(authenticationManager());
		
		custAuthfilter.setFilterProcessesUrl("/api/login");

		http.csrf(csrf -> csrf.disable())

				.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				.authorizeHttpRequests(requests -> requests
						
				.requestMatchers("/**").permitAll()
				
				/*.anyRequest().authenticated()*/)
										
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))

				.addFilter(custAuthfilter)

				.addFilterBefore(new CustomJwtFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager() throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		
		CorsConfiguration configuration = new CorsConfiguration();
		
		configuration.setAllowedOrigins(List.of("*"));
		
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "HEAD"));
		
		configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
		
		configuration.setExposedHeaders(List.of("X-Get-Header"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}