package com.info.controller;

import java.text.DateFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.info.access.Role;
import com.info.entities.Etat_Ticket;
import com.info.entities.Historique;
import com.info.entities.MostPopular;
import com.info.entities.Notification;
import com.info.entities.Personnel;
import com.info.entities.Series;
import com.info.entities.Suivi_Ticket;
import com.info.service.Etat_TicketService;
import com.info.service.HistoriqueService;
import com.info.service.NotificationService;
import com.info.service.PersonnelService;
import com.info.service.Suivi_TicketService;

@RestController
@RequestMapping("/api/suivi_Ticket")
public class Suivi_TicketController {

	private final Suivi_TicketService suivi_TicketService;

	private final HistoriqueService historiqueService;

	private final Etat_TicketService etat_TicketService;

	private final NotificationService notificationService;

	private final PersonnelService personnelService;

	public Suivi_TicketController(Suivi_TicketService suivi_TicketService, HistoriqueService historiqueService,
			Etat_TicketService etat_TicketService, NotificationService notificationService,
			PersonnelService personnelService) {
		this.suivi_TicketService = suivi_TicketService;
		this.historiqueService = historiqueService;
		this.etat_TicketService = etat_TicketService;
		this.notificationService = notificationService;
		this.personnelService = personnelService;
	}

	@GetMapping
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_Tickets() {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getAllSuivi_Tickets();
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/byusername/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByUsername(@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByUsername(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/allSuiviTicketByUsername/{username}")
	public ResponseEntity<List<MostPopular>> getAllSuivi_TicketsByUsernameDashboard(@PathVariable String username) {

		List<Suivi_Ticket> List_suivi_Tickets = suivi_TicketService
				.getSuivi_TicketByUsernameHasPersonnelEnCharge(username);

		List<Personnel> List_personnel_en_charge = personnelService.getAllPersonnels();

		List<MostPopular> listMostPopular = new ArrayList<MostPopular>();

		Date newDate = new Date();

		for (Personnel pers : List_personnel_en_charge) {

			int nbre = 0;

			int i = 0;

			for (Suivi_Ticket suivi : List_suivi_Tickets) {

				if (suivi.getPersonnel_en_charge() != null) {

					if (pers.getId_personnel() == suivi.getPersonnel_en_charge().getId_personnel()) {

						nbre++;

						if (i == 0) {
							newDate = suivi.getDate_suivi_ticket();
						}

						i++;

					}

				}

			}

			Collection<Role> roles = pers.getUser().getRoles();

			for (Role rol : roles) {

				if (rol.getRole_name().equals("ROLE_ADMIN")) {

					if (nbre > 0) {

						MostPopular mostPopular = new MostPopular();
						mostPopular.setPersonnel(pers);
						mostPopular.setNombre(nbre);
						mostPopular.setDerniere(newDate);

						listMostPopular.add(mostPopular);

					}

				}
			}

		}

		listMostPopular.sort(Comparator.comparing(MostPopular::getNombre).reversed());

		return ResponseEntity.ok(listMostPopular);
	}

	@GetMapping("/allSuiviTicketChart")
	public ResponseEntity<List<Series>> getAllSuivi_TicketsChart() {

		List<String> ListMoisannee = new ArrayList<>();

		DateFormatSymbols dfs = new DateFormatSymbols(Locale.FRENCH);
		String[] mois = dfs.getMonths();

		for (int i = 0; i < mois.length - 1; i++) {
			ListMoisannee.add(mois[i]);
		}

		Calendar cal = Calendar.getInstance();

		int year = cal.get(Calendar.YEAR);
		
		SimpleDateFormat formattermoisannee = new SimpleDateFormat("MMMM yyyy");

		List<Suivi_Ticket> List_suivi_Tickets = suivi_TicketService.getAllSuivi_Tickets();

		List<Etat_Ticket> List_etat_Ticket = etat_TicketService.getAllEtat_Tickets();

		List<Series> liste_Series = new ArrayList<Series>();

		for (Etat_Ticket etat : List_etat_Ticket) {

			Series new_series = new Series();

			List<Integer> list_Data = new ArrayList<Integer>();

			for (String moisan : ListMoisannee) {

				String newDaterecup = moisan+" "+year;				

				int nombre_etat = 0;

				for (Suivi_Ticket suivi : List_suivi_Tickets) {

					if (newDaterecup.equals(formattermoisannee.format(suivi.getDate_suivi_ticket()))) {
						
						/*System.out.println("newDaterecup "+newDaterecup +" "+formattermoisannee.format(suivi.getDate_suivi_ticket()));*/

						if (etat.getNom_etat_Ticket().equals(suivi.getEtat_Ticket().getNom_etat_Ticket())) {
							nombre_etat++;
						}

					}

				}

				list_Data.add(nombre_etat);

			}

			new_series.setData(list_Data);

			new_series.setName(etat.getNom_etat_Ticket());

			liste_Series.add(new_series);
		}
				
		return ResponseEntity.ok(liste_Series);
	}

	@GetMapping("/allSuiviTicketChartUser/{username}")
	public ResponseEntity<List<Series>> getAllSuivi_TicketsChart(@PathVariable String username) {

		List<String> ListMoisannee = new ArrayList<>();

		DateFormatSymbols dfs = new DateFormatSymbols(Locale.FRENCH);
		String[] mois = dfs.getMonths();

		for (int i = 0; i < mois.length - 1; i++) {
			ListMoisannee.add(mois[i]);
		}

		Calendar cal = Calendar.getInstance();

		int year = cal.get(Calendar.YEAR);

		SimpleDateFormat formattermoisannee = new SimpleDateFormat("MMMM yyyy");

		List<Suivi_Ticket> List_suivi_Tickets = suivi_TicketService.getSuivi_TicketByUsername(username);

		List<Etat_Ticket> List_etat_Ticket = etat_TicketService.getAllEtat_Tickets();

		List<Series> liste_Series = new ArrayList<Series>();

		for (Etat_Ticket etat : List_etat_Ticket) {

			Series new_series = new Series();

			List<Integer> list_Data = new ArrayList<Integer>();

			for (String moisan : ListMoisannee) {

				String newDaterecup = moisan + " " + year;

				int nombre_etat = 0;

				for (Suivi_Ticket suivi : List_suivi_Tickets) {

					if (newDaterecup.equals(formattermoisannee.format(suivi.getDate_suivi_ticket()))) {

						if (etat.getNom_etat_Ticket().equals(suivi.getEtat_Ticket().getNom_etat_Ticket())) {
							nombre_etat++;
						}

					}

				}

				list_Data.add(nombre_etat);

			}

			new_series.setData(list_Data);

			new_series.setName(etat.getNom_etat_Ticket());

			liste_Series.add(new_series);
		}

		return ResponseEntity.ok(liste_Series);
	}

	@GetMapping("/allSuiviTicketByAdmin")
	public ResponseEntity<List<MostPopular>> getAllSuivi_TicketsByUsernameAdmin() {

		List<Suivi_Ticket> List_suivi_Tickets = suivi_TicketService.getAllSuivi_TicketByAdmin();

		List<Personnel> List_personnel_en_charge = personnelService.getAllPersonnels();

		List<MostPopular> listMostPopular = new ArrayList<MostPopular>();

		Date newDate = new Date();

		for (Personnel pers : List_personnel_en_charge) {

			int nbre = 0;

			int i = 0;

			for (Suivi_Ticket suivi : List_suivi_Tickets) {

				if (suivi.getPersonnel_en_charge() != null) {

					if (pers.getId_personnel() == suivi.getPersonnel_en_charge().getId_personnel()) {

						nbre++;

						if (i == 0) {
							newDate = suivi.getDate_suivi_ticket();
						}

						i++;

					}

				}

			}

			Collection<Role> roles = pers.getUser().getRoles();

			for (Role rol : roles) {

				if (rol.getRole_name().equals("ROLE_ADMIN")) {

					if (nbre > 0) {

						MostPopular mostPopular = new MostPopular();
						mostPopular.setPersonnel(pers);
						mostPopular.setNombre(nbre);
						mostPopular.setDerniere(newDate);

						listMostPopular.add(mostPopular);

					}

				}
			}

		}

		listMostPopular.sort(Comparator.comparing(MostPopular::getNombre).reversed());

		return ResponseEntity.ok(listMostPopular);
	}
	

	@GetMapping("/rapport/{nom_personnel}/{nom_etat}/{nom_type}/{nom_niv_cri}/{nom_personnel_en_charge}/{nom_personnel_assignateur}/{date_debut}/{date_fin}")
	public ResponseEntity<List<Suivi_Ticket>> getAllReport( @PathVariable String nom_personnel,@PathVariable String nom_etat,
			@PathVariable String nom_type, @PathVariable String nom_niv_cri, @PathVariable String nom_personnel_en_charge,@PathVariable String nom_personnel_assignateur, @PathVariable String date_debut, @PathVariable String date_fin) throws ParseException {		
				
		Date debut = null;
		Date fin = null;
		
		SimpleDateFormat format  = new SimpleDateFormat("dd-MM-yyyy");
		
		if( !date_debut.equals("null")) {
			debut = format.parse(date_debut);			
		}
		
		if( !date_fin.equals("null")) {
			fin = format.parse(date_fin);
		}
		
		List<Suivi_Ticket> rapports = suivi_TicketService.findAllFiltered( nom_personnel, nom_etat, nom_type, nom_niv_cri, nom_personnel_en_charge, nom_personnel_assignateur, debut, fin);
				
		return ResponseEntity.ok(rapports);
		
	}
	

	@GetMapping("/bynom_societe")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByNom_societeAllEtat() {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByNom_societe();
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_en_attente_assignation/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatEnAttenteAssignationDashboard(
			@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService
				.getSuivi_TicketByEtatEnAttenteAssignationDashboard(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_en_attente_assignation_admin")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatEnAttenteAssignationDashboardAdmin() {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService
				.getSuivi_TicketByEtatEnAttenteAssignationDashboardAdmin();
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_assigne_admin")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatAssigneDashboardAdmin() {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByEtatAssigneDashboardAdmin();
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_assigne/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatAssigneDashboard(@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByEtatAssigneDashboard(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_en_cours_resolution/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatEnCoursResolutionDashboard(
			@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService
				.getSuivi_TicketByEtatEnCoursResolutionDashboard(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_en_cours_resolution_admin")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatEnCoursResolutionDashboardAdmin() {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByEtatEnCoursResolutionDashboardAdmin();
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_resolu/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatResoluDashboard(@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByEtatResoluDashboard(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_resolu_admin")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatResoluDashboardAdmin() {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByEtatResoluDashboardAdmin();
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_ferme/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatFermeDashboard(@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByEtatFermeDashboard(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/dashboard_ferme_admin")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByEtatFermeDashboardAdmin() {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByEtatFermeDashboardAdmin();
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/bynom_societe_en_attente_assignation")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByNom_societe_En_attente_assignation() {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService
				.getSuivi_TicketByNom_societeEn_attente_assignation();
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/nombre_activities/{username}")
	public ResponseEntity<Integer> getAllActivities(@PathVariable String username) {
		List<Suivi_Ticket> suivi_TicketsAdmin = suivi_TicketService
				.getActivitesAdmin(username);
		List<Suivi_Ticket> suivi_TicketsSup = suivi_TicketService
				.getActivitesSuperviseur(username);
		Integer NbreActivities= suivi_TicketsAdmin.size()+suivi_TicketsSup.size();
		return ResponseEntity.ok(NbreActivities);
	}
	
	@GetMapping("/bynom_societe_en_cours_assignation/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByNom_societe(@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService
				.getSuivi_TicketByNom_societeEn_cours_résolution(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/bynom_societe_en_cours_resolution/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByUsernameEtat_encours_resolution(
			@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService
				.getSuivi_TicketByNom_societeEn_cours_résolution_confirmation(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/bynom_societe_resolu/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByUsernameEtat_Resolu(@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByEtatResolu(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	@GetMapping("/bynom_societe_ferme/{username}")
	public ResponseEntity<List<Suivi_Ticket>> getAllSuivi_TicketsByUsernameEtat_Ferme(@PathVariable String username) {
		List<Suivi_Ticket> suivi_Tickets = suivi_TicketService.getSuivi_TicketByEtatFerme(username);
		return ResponseEntity.ok(suivi_Tickets);
	}

	// Get a suivi_Ticket by ID
	@GetMapping("/{id}")
	public ResponseEntity<Suivi_Ticket> getSuivi_TicketById(@PathVariable Long id) {
		Suivi_Ticket suivi_Ticket = suivi_TicketService.getSuivi_TicketById(id);
		return ResponseEntity.ok(suivi_Ticket);
	}

	// Get a suivi_Ticket by name
	/*
	 * @GetMapping("/suivi_Ticketbyname/{name}") public ResponseEntity<Suivi_Ticket>
	 * getSuivi_TicketByName(@PathVariable String name) { Suivi_Ticket suivi_Ticket
	 * = suivi_TicketService.getSuivi_TicketByNom(name); return
	 * ResponseEntity.ok(suivi_Ticket); }
	 */

	// Create a new suivi_Ticket
	@PostMapping
	public ResponseEntity<Suivi_Ticket> createSuivi_Ticket(@RequestBody Suivi_Ticket suivi_Ticket) {
		Suivi_Ticket createdSuivi_Ticket = suivi_TicketService.createSuivi_Ticket(suivi_Ticket);
		return ResponseEntity.ok(createdSuivi_Ticket);
	}

	@PostMapping("/confirmation_suivi_ticket")
	public ResponseEntity<?> assignation_suivi_ticket(@RequestBody Suivi_Ticket suivi_Ticket) {

		Notification recupNotifcation = notificationService
				.getNotificationByIdAndType(suivi_Ticket.getId_suivi_Ticket(), "AS", "Action");
		if (recupNotifcation != null) {
			recupNotifcation.setIsreading(true);
			notificationService.updateNotificationWithObjet(recupNotifcation.getId_notification(), recupNotifcation);
		}

		Suivi_Ticket recupsuivi_Ticket = suivi_Ticket;
		Etat_Ticket newEtat_Ticket = etat_TicketService.getEtat_TicketByNom("En cours résolution");
		recupsuivi_Ticket.setDate_suivi_ticket(new Date());
		recupsuivi_Ticket.setEtat_Ticket(newEtat_Ticket);
		recupsuivi_Ticket.setPersonnel_assignateur(suivi_Ticket.getPersonnel_assignateur());
		recupsuivi_Ticket.setPersonnel_en_charge(suivi_Ticket.getPersonnel_en_charge());
		suivi_TicketService.updateSuivi_Ticket(recupsuivi_Ticket.getId_suivi_Ticket(), recupsuivi_Ticket);

		Historique newHistorique = new Historique();
		newHistorique.setDate_historique(new Date());
		newHistorique.setPersonnel_assignateur(recupsuivi_Ticket.getPersonnel_assignateur());
		newHistorique.setPersonnel_en_charge(recupsuivi_Ticket.getPersonnel_en_charge());
		newHistorique.setHistorique_etat_ticket(recupsuivi_Ticket.getEtat_Ticket().getNom_etat_Ticket());
		newHistorique.setSuivi_Ticket(recupsuivi_Ticket);
		newHistorique.setHistorique_etat_ticket(newEtat_Ticket.getNom_etat_Ticket());
		historiqueService.createHistorique(newHistorique);

		Notification notification = new Notification();
		notification.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification.setIsreading(false);
		notification.setPersonnel_concerne(recupsuivi_Ticket.getTicket().getPersonnel());
		notification.setMessage("Votre ticket est en cours de résolution");
		notification.setCode("ECR");
		notification.setType("Info");
		notification.setSuivi_Ticket(recupsuivi_Ticket);
		notificationService.createNotification(notification);

		Notification notification2 = new Notification();
		notification2.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification2.setIsreading(false);
		notification2.setPersonnel_concerne(recupsuivi_Ticket.getPersonnel_assignateur());
		notification2.setMessage("Le N° Ticket " + recupsuivi_Ticket.getTicket().getNumero_ticket()
				+ " est en cours de résolution par " + recupsuivi_Ticket.getPersonnel_en_charge().getNom_personnel());
		notification2.setSuivi_Ticket(recupsuivi_Ticket);
		notification2.setCode("ECR");
		notification2.setType("Info");
		notificationService.createNotification(notification2);

		return ResponseEntity.ok("Suivi du ticket confirmé");
	}

	@PostMapping("/confirmationUser_suivi_ticket")
	public ResponseEntity<?> assignationUser_suivi_ticket(@RequestBody Suivi_Ticket suivi_Ticket) {

		Suivi_Ticket recupsuivi_Ticket = suivi_Ticket;
		Etat_Ticket newEtat_Ticket = etat_TicketService.getEtat_TicketByNom("Fermé");
		recupsuivi_Ticket.setDate_suivi_ticket(new Date());
		recupsuivi_Ticket.setEtat_Ticket(newEtat_Ticket);
		recupsuivi_Ticket.setPersonnel_assignateur(suivi_Ticket.getPersonnel_assignateur());
		recupsuivi_Ticket.setPersonnel_en_charge(suivi_Ticket.getPersonnel_en_charge());
		suivi_TicketService.updateSuivi_Ticket(recupsuivi_Ticket.getId_suivi_Ticket(), recupsuivi_Ticket);

		Notification recupNotifcation = notificationService
				.getNotificationByIdAndType(suivi_Ticket.getId_suivi_Ticket(), "RE", "Action");
		recupNotifcation.setIsreading(true);
		notificationService.updateNotificationWithObjet(recupNotifcation.getId_notification(), recupNotifcation);

		Historique newHistorique = new Historique();
		newHistorique.setDate_historique(recupsuivi_Ticket.getDate_suivi_ticket());
		newHistorique.setPersonnel_assignateur(recupsuivi_Ticket.getPersonnel_assignateur());
		newHistorique.setPersonnel_en_charge(recupsuivi_Ticket.getPersonnel_en_charge());
		newHistorique.setHistorique_etat_ticket(recupsuivi_Ticket.getEtat_Ticket().getNom_etat_Ticket());
		newHistorique.setSuivi_Ticket(recupsuivi_Ticket);
		historiqueService.createHistorique(newHistorique);

		Notification notification = new Notification();
		notification.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification.setIsreading(false);
		notification.setPersonnel_concerne(recupsuivi_Ticket.getPersonnel_en_charge());
		notification.setMessage("La résolution du ticket N° " + recupsuivi_Ticket.getTicket().getNumero_ticket()
				+ " a été validée par " + recupsuivi_Ticket.getTicket().getPersonnel().getNom_personnel());
		notification.setSuivi_Ticket(recupsuivi_Ticket);
		notification.setCode("RE");
		notification.setType("Info");
		notificationService.createNotification(notification);

		Notification notification11 = new Notification();
		notification11.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification11.setIsreading(false);
		notification11.setPersonnel_concerne(recupsuivi_Ticket.getPersonnel_en_charge());
		notification11.setMessage("Le ticket N° " + recupsuivi_Ticket.getTicket().getNumero_ticket() + " a été fermé");
		notification11.setCode("FE");
		notification11.setType("Info");
		notification11.setSuivi_Ticket(recupsuivi_Ticket);
		notificationService.createNotification(notification11);

		Notification notification2 = new Notification();
		notification2.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification2.setIsreading(false);
		notification2.setPersonnel_concerne(recupsuivi_Ticket.getPersonnel_assignateur());
		notification2.setMessage("La résolution du ticket N° " + recupsuivi_Ticket.getTicket().getNumero_ticket()
				+ " a été validée par " + recupsuivi_Ticket.getTicket().getPersonnel().getNom_personnel());
		notification2.setSuivi_Ticket(recupsuivi_Ticket);
		notification2.setCode("RE");
		notification2.setType("Info");
		notificationService.createNotification(notification2);

		Notification notification21 = new Notification();
		notification21.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification21.setIsreading(false);
		notification21.setPersonnel_concerne(recupsuivi_Ticket.getPersonnel_en_charge());
		notification21.setMessage("Le ticket N° " + recupsuivi_Ticket.getPersonnel_assignateur().getNom_personnel() + " a été fermé");
		notification21.setCode("FE");
		notification21.setType("Info");
		notification21.setSuivi_Ticket(recupsuivi_Ticket);
		notificationService.createNotification(notification21);

		return ResponseEntity.ok("Ticket fermé");
	}

	@PostMapping("/annulationUser_suivi_ticket")
	public ResponseEntity<?> annulationUser_suivi_ticket(@RequestBody Suivi_Ticket suivi_Ticket) {

		Suivi_Ticket recupsuivi_Ticket = suivi_Ticket;
		Etat_Ticket newEtat_Ticket = etat_TicketService.getEtat_TicketByNom("En cours résolution");
		recupsuivi_Ticket.setDate_suivi_ticket(new Date());
		recupsuivi_Ticket.setEtat_Ticket(newEtat_Ticket);
		recupsuivi_Ticket.setPersonnel_assignateur(suivi_Ticket.getPersonnel_assignateur());
		recupsuivi_Ticket.setPersonnel_en_charge(suivi_Ticket.getPersonnel_en_charge());
		suivi_TicketService.updateSuivi_Ticket(recupsuivi_Ticket.getId_suivi_Ticket(), recupsuivi_Ticket);

		Notification recupNotifcation = notificationService
				.getNotificationByIdAndType(suivi_Ticket.getId_suivi_Ticket(), "RE", "Action");
		recupNotifcation.setIsreading(true);
		notificationService.updateNotificationWithObjet(recupNotifcation.getId_notification(), recupNotifcation);

		Historique newHistorique = new Historique();
		newHistorique.setDate_historique(recupsuivi_Ticket.getDate_suivi_ticket());
		newHistorique.setPersonnel_assignateur(recupsuivi_Ticket.getPersonnel_assignateur());
		newHistorique.setPersonnel_en_charge(recupsuivi_Ticket.getPersonnel_en_charge());
		newHistorique.setHistorique_etat_ticket(recupsuivi_Ticket.getEtat_Ticket().getNom_etat_Ticket());
		newHistorique.setSuivi_Ticket(recupsuivi_Ticket);
		historiqueService.createHistorique(newHistorique);

		Notification notification = new Notification();
		notification.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification.setIsreading(false);
		notification.setPersonnel_concerne(recupsuivi_Ticket.getPersonnel_en_charge());
		notification.setMessage("La résolution du ticket N° " + recupsuivi_Ticket.getTicket().getNumero_ticket()
				+ " n'a pas été validée par " + recupsuivi_Ticket.getTicket().getPersonnel().getNom_personnel());
		notification.setSuivi_Ticket(recupsuivi_Ticket);
		notification.setCode("ECR");
		notification.setType("Info");
		notificationService.createNotification(notification);

		Notification notification2 = new Notification();
		notification2.setDate_notification(recupsuivi_Ticket.getDate_suivi_ticket());
		notification2.setIsreading(false);
		notification2.setPersonnel_concerne(recupsuivi_Ticket.getPersonnel_assignateur());
		notification2.setMessage("La résolution du ticket N° " + recupsuivi_Ticket.getTicket().getNumero_ticket()
				+ " n'a pas été validée par " + recupsuivi_Ticket.getTicket().getPersonnel().getNom_personnel());
		notification2.setSuivi_Ticket(recupsuivi_Ticket);
		notification2.setType("Info");
		notificationService.createNotification(notification2);

		return ResponseEntity.ok("Ticket retourné en cours résolution");
	}

	// Update a suivi_Ticket
	/*
	 * @PutMapping("/{id}") public ResponseEntity<Suivi_Ticket>
	 * updateSuivi_Ticket(@PathVariable Long id,
	 * 
	 * @RequestBody Suivi_Ticket suivi_Ticket) { Suivi_Ticket updatedSuivi_Ticket =
	 * suivi_TicketService.updateSuivi_Ticket(id, suivi_Ticket); return
	 * ResponseEntity.ok(updatedSuivi_Ticket); }
	 */

	// Delete a suivi_Ticket
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteSuivi_Ticket(@PathVariable Long id) {
		suivi_TicketService.deleteSuivi_Ticket(id);
		return ResponseEntity.noContent().build();
	}

	public static List<String> getMonthNamesOfCurrentYear() {
		YearMonth currentMonth = YearMonth.now();
		List<String> yearMonths = new ArrayList<>();

		for (int month = 1; month <= currentMonth.getMonthValue(); month++) {
			yearMonths.add(YearMonth.of(currentMonth.getYear(), month)
					.format(DateTimeFormatter.ofPattern("MMMM", Locale.FRENCH)));
		}

		return yearMonths;
	}

}
