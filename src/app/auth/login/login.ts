// src/app/auth/login/login.ts
import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from '../../auth/auth';
import { signal } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loading = signal(false);
  error = signal('');
  
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    
    this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  }

  onSubmit() {
    this.error.set('');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.auth.login(this.loginForm.value).subscribe({
       next: res => {
      this.loading.set(false);

       console.log('Decoded JWT:', this.auth.getPayload());
       console.log('Roles from token:', this.auth['tokenService'].getRoles());


        // JWT is already saved in Token service inside Auth.login()
        //  Decoded payload is used to get role
        const userRole = (this.auth.getPayload()?.roles?.[0] || 'USER').toUpperCase();
        
      // redirect based on role
      if (userRole === 'ROLE_ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }
      },
      error: err => {
         this.loading.set(false);

        console.log("Backend error:", err);

        // FIXED PROPER ERROR HANDLING
   this.error.set(
    err?.error?.message ||
    err?.error?.error ||
    err?.message ||
    'Login failed'
  );
}
    });
  }
}
