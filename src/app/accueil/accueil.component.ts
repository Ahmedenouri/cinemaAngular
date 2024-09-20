import {Component, OnInit} from '@angular/core';
import {CinemaService} from "../servicesImpl/cinema.service";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    NgOptimizedImage,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit{
  public villes:any;
  public cinemas:any;
  public salles:any;
  currentVille:any;
  currentCinema:any;
  public currentProjection: any;
  public selectedTickets: any[] | undefined;

  constructor(public cinemaService:CinemaService) {}

  ngOnInit(): void {
    this.cinemaService.getVilles()
      .subscribe(data=>{
        this.villes = data;
      })
  }

  onGetCinema(ville: any) {
    this.currentVille=ville
    this.salles=undefined;
    this.cinemaService.getCinema(ville)
      .subscribe((data: any)=>{
        this.cinemas = data;
      })
  }
  onGetSalle(cinema: any) {
    this.currentCinema=cinema;
    this.cinemaService.getSalle(cinema)
      .subscribe((data: any)=>{
        this.salles =data;
        this.salles._embedded.salles.forEach((s:any)=>{
          this.cinemaService.getProjection(s)
            .subscribe((data:any)=>{
              s.projections=data;
            })
        })
      })
  }

  onGetTicketsPlaces(p: any) {
    this.currentProjection=p;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe((data:any)=>{
        this.currentProjection.tickets=data;
        this.selectedTickets=[];
      })

  }

  onSelectTicket(t: any) {
    t.selected=!t.selected;
    this.selectedTickets?.push(t);
  }

  getTicketClass(t: any) {
    let str="btn ticket ";
    if(t.reservationTicket==true){
      str+="btn-danger";
    }else if(t.selected){
      str+="btn-warning";
    }else {
      str+="btn-success";
    }
    return str;
  }

  onPayTickets(value: any) {
    let tickets: any[] =[];
    this.selectedTickets?.forEach(t=> {
      tickets.push(t.idTicket);
    })
    value.tickets=tickets;
    this.cinemaService.payerTickets(value)
      .subscribe((data:any)=>{
        alert("Tickets Réservés avec succés!");
        this.onGetTicketsPlaces(this.currentProjection)
      })
  }
}
