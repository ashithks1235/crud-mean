import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServices } from '../../services/user';
import { UserModel } from '../../models/user'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
  imports: [CommonModule, FormsModule]
})
export class AddUser {

  router = inject(Router);
  api = inject(ApiServices);
  route = inject(ActivatedRoute)
  userId = this.route.snapshot.params['id']
  userDetails = signal<UserModel>({});

  

  addUser() {
    const {name,email,mobile,age} = this.userDetails()
    if (name && email && mobile && age) {
      this.api.addUser(this.userDetails()).subscribe({
        next: (res:any) => {
          alert("User added successfully");
          this.router.navigateByUrl('/users');
        },
        error: (reason:any) => {
          alert(reason.error);
        }
      });

    } else {
      alert("Please fill all fields");
    }
  }

}
