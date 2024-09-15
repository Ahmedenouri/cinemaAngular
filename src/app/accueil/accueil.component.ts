import {Component, OnInit} from '@angular/core';
import {CinemaService} from "../servicesImpl/cinema.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass
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

  constructor(private cinemaService:CinemaService) {}

  ngOnInit(): void {
    this.cinemaService.getVilles()
      .subscribe(_dataVille=>{
        this.villes = _dataVille;
      })
  }

  onGetCinema(ville: any) {
    this.currentVille=ville
    this.cinemaService.getCinema(ville)
      .subscribe((_dataCinema: any)=>{
        this.cinemas = _dataCinema;
      })
  }
  onGetSalle(cinema: any) {
    this.currentCinema=cinema;
    this.cinemaService.getSalle(cinema)
      .subscribe((_dataSalle: any)=>{
        this.salles = _dataSalle;
      })
  }
}
