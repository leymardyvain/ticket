package com.info.form;

import java.util.List;

import com.info.access.User;
import com.info.entities.Departement;

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
public class FormData {
	
   private Long Id_personnel;
    private String nom_personnel;
    private Departement departement;
    private List<String> roles;
    private User user;
    private Boolean is_delete;

}
