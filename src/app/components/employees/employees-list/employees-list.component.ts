import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../../services/graphql.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employees-list.component.html',
})
export class EmployeesListComponent implements OnInit {
  employees: any[] = [];
  searchDesignation = '';
  searchDepartment = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  ngOnInit() {
    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.gql.getAllEmployees().subscribe({
      next: (res: any) => {
        this.employees = res.data?.getAllEmployees || [];
      },
      error: (err: any) => console.error('GraphQL error:', err),
    });
  }

  search() {
    this.gql.searchEmployees(this.searchDesignation, this.searchDepartment).subscribe({
      next: (res: any) => {
        this.employees = res.data.searchEmployees;
      },
      error: (err: any) => {
        console.error('Search error:', err);
        this.employees = []; // clear if no match
      },
    });
  }

  clearSearch() {
    this.searchDesignation = '';
    this.searchDepartment = '';
    this.loadAllEmployees();
  }

  goToAdd() {
    this.router.navigate(['/add-employee']);
  }

  viewEmployee(id: string) {
    this.router.navigate(['/view-employee', id]);
  }

  updateEmployee(id: string) {
    this.router.navigate(['/update-employee', id]);
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.gql.deleteEmployee(id).subscribe({
        next: () => this.loadAllEmployees(),
        error: (err) => console.error('Delete error:', err),
      });
    }
  }
  logout() {
    localStorage.removeItem('token'); // or sessionStorage if you're using that
    this.router.navigate(['/login']);
  }
  
}
