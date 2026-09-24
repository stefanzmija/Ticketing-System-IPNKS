import { Component } from '@angular/core';

export type TicketStatus = | 'open' | 'in_progress'  | 'waiting_student' | 'resolved' | 'closed' | 'rejected';

export type TicketPriority = 'low' | 'normal' | 'high';

export interface Ticket{
  id: number;
  title: string;
  description: string;
  category_id: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_by: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

@Component({
  imports: [],
  selector: 'app-tickets',
  styleUrl: './tickets.css',
  templateUrl: './tickets.html',
})
export class Tickets {

}
