import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServices } from '../../services/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser {

  router = inject(Router)
  api = inject(ApiServices)
  route = inject(ActivatedRoute)
  userId = this.route.snapshot.params['id'];
  userDetails = signal<UserModel>({});

  ngOnInit() {
    if (this.userId) {
      this.api.getUser(this.userId).subscribe((res: any) => {
        this.userDetails.set(res.data);
      });
    }
  }

  editUser() {
    const { name, email, mobile, age } = this.userDetails();
    if (name && email && mobile && age) {

      this.api.updateUser(this.userId, this.userDetails()).subscribe((res:any) => {
            alert("User updated successfully");
            this.router.navigateByUrl('/users');
          });
    } else {
      alert("Please fill all fields");
    }
  }

}
