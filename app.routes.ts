import { Routes } from '@angular/router';
import {Home} from './features/home/home';
import {Contact} from './features/contact/contact';
import {MyTickets} from './features/my-tickets/my-tickets';

export const routes: Routes = [
  {path: "home", component: Home},
  {path: "contact", component: Contact},
  {path: "my-tickets", component: MyTickets},
  {path: "**", redirectTo: ''},
];
