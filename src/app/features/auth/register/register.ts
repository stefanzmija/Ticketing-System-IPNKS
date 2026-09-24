import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = signal<string | null>(null);
  loading = signal(false);


  form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    studentIndex: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    try {
      const { email, password, fullName, studentIndex } = this.form.getRawValue();
      await this.auth.register(email, password, fullName, studentIndex);
      this.router.navigate(['/my-tickets']);
    } catch (e: any) {
      this.error.set(e.message ?? 'Грешка при регистрација.');
    } finally {
      this.loading.set(false);
    }
  }
}
