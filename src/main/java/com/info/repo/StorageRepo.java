package com.info.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.info.entities.ImageData;

public interface StorageRepo extends JpaRepository<ImageData, Long> {

	ImageData findByName(String fileName);

	@Query("select u from ImageData u where u.ticket.Id_ticket= ?1 ")
	List<ImageData> findImageDataByIDTicket(Long id_ticket);
	
	@Query("select u from ImageData u where u.ticket.numero_ticket= :num")
	List<ImageData> findListImageDataByNumTicket(String num);

}
