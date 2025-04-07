import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';

export const routes: Routes = [
  { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'employees', loadComponent: () => import('./components/employees/employees-list/employees-list.component').then(m => m.EmployeesListComponent) },
  { path: 'add-employee', loadComponent: () => import('./components/employees/add-employee/add-employee.component').then(m => m.AddEmployeeComponent) },
  { path: 'update-employee/:id', loadComponent: () => import('./components/employees/update-employee/update-employee.component').then(m => m.UpdateEmployeeComponent) },
  { path: 'view-employee/:id', loadComponent: () => import('./components/employees/view-employee/view-employee.component').then(m => m.ViewEmployeeComponent) },


];
