import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketsService } from '../tickets.service';
import { Category } from '../../../core/models/category.model';
import { TicketPriority } from '../../../core/models/ticket.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.html',
  styleUrl: './ticket-create.css',
})
export class TicketCreate implements OnInit {
  private fb = inject(FormBuilder);
  private tickets = inject(TicketsService);
  private router = inject(Router);

  categories = signal<Category[]>([]);
  error = signal<string | null>(null);
  saving = signal(false);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    category_id: ['', Validators.required],
    priority: ['normal', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  async ngOnInit() {
    this.categories.set(await this.tickets.getCategories());
  }

  async submit() {
    if (this.form.invalid) return;
    this.saving.set(true);
    this.error.set(null);

    try {
      const v = this.form.getRawValue();
      const ticket = await this.tickets.create({
        title: v.title,
        description: v.description,
        category_id: Number(v.category_id),
        priority: v.priority as TicketPriority,
      });
      this.router.navigate(['/tickets', ticket.id]);
    } catch (e: any) {
      this.error.set(e.message ?? 'Грешка при креирање на тикетот.');
    } finally {
      this.saving.set(false);
    }
  }
}
