import { Routes } from '@angular/router';
import {Home} from './features/home/home';
import {Contact} from './features/contact/contact';
import {MyTickets} from './features/my-tickets/my-tickets';
import {Login} from './features/auth/login/login';
import {Register} from './features/auth/register/register';

export const routes: Routes = [
  {path: "home", component: Home},
  {path: "contact", component: Contact},
  {path: "my-tickets", component: MyTickets},
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {path: "**", redirectTo: ''},
];
