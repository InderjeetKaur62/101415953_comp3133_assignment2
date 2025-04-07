import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../../../services/graphql.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-employee.component.html',
})
export class UpdateEmployeeComponent implements OnInit {
  id = '';
  firstName = '';
  lastName = '';
  emailId = '';
  gender: string = '';
  designation: string = '';
  salary: number = 0;
  dateOfJoining: string = '';
  department: string = '';
  employeePhoto: string = '';
  

  constructor(private route: ActivatedRoute, private gql: GraphqlService, public router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.gql.getEmployeeById(this.id).subscribe({
      next: (res: any) => {
        const emp = res.data.getEmployeeById;
        this.firstName = emp.first_name;
        this.lastName = emp.last_name;
        this.emailId = emp.email;
        this.gender = emp.gender;
        this.designation = emp.designation;
        this.department = emp.department;
        this.salary = emp.salary;
        this.dateOfJoining = emp.date_of_joining?.substring(0, 10); // handle formatting
        this.employeePhoto = emp.employee_photo;
      },
      error: (err) => console.error('Fetch error:', err),
    });
  }

  onSubmit() {
    this.gql.updateEmployee(
      this.id,
      this.firstName,
      this.lastName,
      this.emailId,
      this.gender,
      this.designation,
      this.salary ?? 0,
      this.dateOfJoining,
      this.department,
      this.employeePhoto
    ).subscribe({
      next: () => {
        alert('Employee updated successfully!');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Update error:', err);
        alert('Failed to update employee');
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
