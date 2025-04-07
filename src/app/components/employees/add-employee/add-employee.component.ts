import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../../../services/graphql.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
})
export class AddEmployeeComponent {
  firstName = '';
  lastName = '';
  emailId = '';
  gender = '';
  designation = '';
  department = '';
  salary: number | null = null;
  dateOfJoining = '';
  employeePhoto = '';

  constructor(public router: Router, private gql: GraphqlService) {}

  addEmployee() {
    if (!this.firstName || !this.lastName || !this.emailId) {
      alert('First name, last name, and email are required!');
      return;
    }

    this.gql
      .addEmployee(
        this.firstName,
        this.lastName,
        this.emailId,
        this.gender,
        this.designation,
        this.salary ?? 0,
        this.dateOfJoining,
        this.department,
        this.employeePhoto
      )
      .subscribe({
        next: () => {
          alert('Employee added successfully!');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('GraphQL Error:', err);
          alert('Failed to add employee');
        },
      });
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.employeePhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
