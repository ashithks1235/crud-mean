import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServices } from '../services/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  router = inject(Router);
  api = inject(ApiServices);
  fb = inject(FormBuilder);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*')
      ]]
    });
  }

  register() {

    if (this.registerForm.valid) {

      const name = this.registerForm.value.name;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;

      this.api.register({
        name,
        email,
        password
      }).subscribe({

        next: ((res: any) => {
          this.registerForm.reset();
          alert("User registered successfully");
          this.router.navigateByUrl('/login');
        }),

        error: ((reason: any) => {
          this.registerForm.reset();
          alert(reason.error?.message || "Registration failed");
        })

      });

    } else {
      alert("Invalid form! Please fill the form with valid data.");
    }
  }

}
