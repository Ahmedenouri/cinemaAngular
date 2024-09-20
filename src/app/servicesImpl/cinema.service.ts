import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CinemaService{

  public host:string="http://localhost:9999";

  constructor(public http: HttpClient) { }

  public getVilles(){
    return this.http.get(`${this.host}/villes`);
  }

  getCinema(ville: any) {
    return this.http.get(ville._links.cinemas.href);
  }
  getSalle(cinema: any) {
    return this.http.get(cinema._links.salles.href);
  }

  getProjection(s: any) {
    let url=s._links.projectionFilms.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1");
    //return this.http.get(s._links.projectionFilms.href);
  }

  getTicketsPlaces(p: any) {
    let url=p._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=ticketProj");
  }

  payerTickets(value: any) {
    return this.http.post(this.host+"/payerTickets",value);
  }
}
