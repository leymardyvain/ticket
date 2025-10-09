package com.info.form;

import java.util.List;

import com.info.entities.ImageData;
import com.info.entities.Niveau_criticite;
import com.info.entities.Type_Ticket;

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
public class FormDataTicket {
	
	private Long Id_ticket;
	private String numero_ticket;
	private String description;
    private Niveau_criticite niveau_criticite;
    private Type_Ticket type_Ticket;
    private List<ImageData> images;
    private String username;

}
