import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { UserList } from './components/user-list/user-list';
import { AddUser } from './components/add-user/add-user';
import { EditUser } from './components/edit-user/edit-user';
import { Register } from './register/register';

export const routes: Routes = [
{ path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: Login,title:'login' },
  { path: 'register', component: Register,title:'register' },
  { path: 'users', component: UserList,title:'Users' },
  { path: 'add-user', component: AddUser,title:'Add User' },
  { path: 'edit-user/:id', component: EditUser,title:'Edit User' }
];
