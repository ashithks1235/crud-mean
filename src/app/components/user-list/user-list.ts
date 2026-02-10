import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiServices } from '../../services/user';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {

  users:any = signal([])
  api = inject(ApiServices)

  ngOnInit(){
    this.loadUsers()
  }

  loadUsers() {
    this.api.getUsers().subscribe((res:any) => {
      this.users.set(res.data)
    });
  }

  deleteUser(id: string) {
    this.api.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

}
