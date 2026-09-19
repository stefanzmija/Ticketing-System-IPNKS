import { Component, Injectable, signal,  computed } from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {Hero} from '../hero/hero';
import {Ticket, Tickets} from '../tickets/tickets';
import { supabase } from '../../core/supabase.client';


@Component({
  imports: [
    Hero, Tickets,
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})

export class Home {


}
