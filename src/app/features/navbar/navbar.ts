import { Component,inject } from '@angular/core';
import { RouterLink  } from '@angular/router';
import {AuthService} from '../../core/auth.service';


@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  auth = inject(AuthService);
}
