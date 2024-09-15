import { Routes } from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {ContactusComponent} from "./contactus/contactus.component";

export const routes: Routes = [
  {path:'accueil', component:AccueilComponent},
  {path:'contact-us',component:ContactusComponent}
];
