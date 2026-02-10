import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServices } from '../../services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  router = inject(Router);
  api = inject(ApiServices);
  fb = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*')
      ]]
    });
  }

  login() {

    if (this.loginForm.valid) {

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.api.login({ email, password }).subscribe({

        next: (res: any) => {

          // Store JWT
          sessionStorage.setItem("token", res.token);

          // Store user details
          sessionStorage.setItem("user", JSON.stringify(res.user));

          this.loginForm.reset();

          alert("User login successful");

          // Role-based navigation
          if (res.user.role === "admin") {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/users');
          }
        },

        error: (reason: any) => {
          alert(reason.error.message || "Login failed");
        }

      });

    } else {
      alert("Invalid form! Please fill the form correctly.");
    }
  }
}
