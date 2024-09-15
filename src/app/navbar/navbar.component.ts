import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CinemaService} from "../servicesImpl/cinema.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, NgForOf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  public villes:any;

  constructor(private cinemaService:CinemaService) {}
    ngOnInit(): void {
        this.cinemaService.getVilles()
          .subscribe(_data=>{
            this.villes = _data;
          })
    }

}
