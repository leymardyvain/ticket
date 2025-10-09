package com.info.entities;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MostPopular {
	
	private Personnel personnel;
	
	private int nombre;
	
	private Date derniere;
}
