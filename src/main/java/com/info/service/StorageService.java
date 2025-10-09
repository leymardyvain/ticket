package com.info.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.info.entities.ImageData;
import com.info.entities.Ticket;
import com.info.repo.StorageRepo;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class StorageService {

	private final StorageRepo repository;

	public StorageService(StorageRepo repository) {
		this.repository = repository;
	}

	public String uploadImage(MultipartFile file, Ticket ticket) throws IOException {
		SimpleDateFormat mdyFormat = new SimpleDateFormat("ddMMyyyyhhmmss");
		Date now = new Date();
		String name_change = mdyFormat.format(now);
		String combine = file.getOriginalFilename() + "_" + name_change;
		ImageData imageData = repository.save(ImageData.builder().ticket(ticket).name(combine)
				.type(file.getContentType()).imageData((file.getBytes())).build());
		if (imageData != null) {
			return "Fichier " + file.getOriginalFilename() + " envoyé avec succès !";
		}
		return null;
	}

	public ImageData saveImage(ImageData file) throws IOException {
		return repository.save(file);
	}

	public ImageData downloadImage(String fileName) {
		ImageData dbImageData = repository.findByName(fileName);
		return dbImageData;
	}

	public ImageData getDocument(String fileName) {
		ImageData dbImageData = repository.findByName(fileName);
		return dbImageData;
	}
	
	public List<ImageData> getDocumentByTicketNumero(String num) {
		List<ImageData> dbImageData = repository.findListImageDataByNumTicket(num);
		return dbImageData;
	}

	public void deleteImage(Long idFile) {
		try {
			ImageData image = repository.getById(idFile);
			repository.delete(image);
		} catch (Exception e) {
			throw new RuntimeException("Fichier not found");
		}

	}

	public List<ImageData> GetAll(Long id) {
		return repository.findImageDataByIDTicket(id);
	}

}
