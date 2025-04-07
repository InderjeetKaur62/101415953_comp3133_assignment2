import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../services/graphql.service'; // adjust if needed

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  onSubmit() {
    this.gql.login(this.email, this.password).subscribe({
      next: (res) => {
        const token = res.data?.login;
        if (token) {
          localStorage.setItem('token', token);
          alert('Login successful!');
          this.router.navigate(['/employees']);
        } else {
          alert('Login failed: No token returned.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Invalid credentials.');
      },
    });
  }
}
