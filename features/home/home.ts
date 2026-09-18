import { Component } from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {Hero} from '../hero/hero';

@Component({
  imports: [
    Hero
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
