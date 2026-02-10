import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  
  apiUrl = 'https://crud-mean-server.onrender.com';
  http = inject(HttpClient)

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(user:any){
    return this.http.post(`${this.apiUrl}/login`,user)
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUser(id: string) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  addUser(user: any) {
    return this.http.post(`${this.apiUrl}/users`, {
    name: user.name,
    email: user.email,
    mobile: Number(user.mobile),
    age: Number(user.age)
  });
  }

  updateUser(id: string, user: any) {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
