package com.info.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.info.entities.ImageData;
import com.info.entities.Ticket;
import com.info.service.StorageService;
import com.info.service.TicketService;

@RestController
@RequestMapping("/api/fichier")
public class FileController {

	private final StorageService storeService;

	private final TicketService ticketService;

	public FileController(StorageService storeService, TicketService ticketService) {
		this.storeService = storeService;
		this.ticketService = ticketService;
	}

	@PostMapping
	public ResponseEntity<?> uploadImage(@RequestParam("fichier") List<MultipartFile> files,
			@RequestParam("numeroTicket") String Numticket) throws IOException {

		Ticket RecupTicket = ticketService.getTicketByNumero(Numticket);
		if (files.size() > 0) {

			for (MultipartFile file : files) {
				storeService.uploadImage(file, RecupTicket);
			}
		}

		return ResponseEntity.status(HttpStatus.OK).body("Fichier envoyé");
	}

	@GetMapping("/ticket/{id_ticket}")
	public ResponseEntity<?> GetAllData(@PathVariable Long id_ticket) {
		return ResponseEntity.status(HttpStatus.OK).body(storeService.GetAll(id_ticket));
	}

	@DeleteMapping("/{idFile}")
	public ResponseEntity<Void> deleteTicket(@PathVariable Long idFile) {
		storeService.deleteImage(idFile);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/download/{fileName}")
	public ResponseEntity<byte[]> downloadPdf(@PathVariable String fileName) {
		ImageData imageFile = storeService.downloadImage(fileName);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(imageFile.getType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageFile.getName() + "\"")
				.body(imageFile.getImageData());
	}

	@GetMapping("/downloadfile/{fileName}")
	public ResponseEntity<byte[]> downloadPdfFile(@PathVariable String fileName) {
		ImageData imageFile = storeService.downloadImage(fileName);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(imageFile.getType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageFile.getName() + "\"")
				.body(imageFile.getImageData());
	}

	@GetMapping("/display/{fileName}")
	public ResponseEntity<byte[]> getDocument(@PathVariable String fileName) {
		ImageData imageFile = storeService.getDocument(fileName);

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(imageFile.getType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imageFile.getName() + "\"")
				.body(imageFile.getImageData());
	}

	@GetMapping("/count/{numeroTicket}")
	public ResponseEntity<Integer> getDocumentByNumTicket(@PathVariable String numeroTicket) {
		List<ImageData> imageFile = storeService.getDocumentByTicketNumero(numeroTicket);
		System.out.println("num "+imageFile.size());
		return ResponseEntity.ok(imageFile.size());
	}
}
