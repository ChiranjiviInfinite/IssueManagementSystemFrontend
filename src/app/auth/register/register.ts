// src/app/auth/register/register.ts
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  loading = signal(false);
  error = signal('');
  success = signal('');

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.error.set('');
    this.success.set('');
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.auth.register(this.registerForm.value).subscribe({
      next: res => {
        console.log("Register success:", res);

        this.loading.set(false);
        this.success.set("Registration successful! Redirecting to login…");

        // Wait 1 second so user sees success message
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1200);
      },
      error: err => {
        this.loading.set(false);

        console.log("Register error:", err);

        this.error.set(
          err?.error?.message ||   // message from backend if present
          err?.error?.error ||     // fallback for Spring security errors
          err?.message ||          // fallback
          "Registration failed"
        );
      }
    });
  }
}
