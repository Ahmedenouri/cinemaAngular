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
}
