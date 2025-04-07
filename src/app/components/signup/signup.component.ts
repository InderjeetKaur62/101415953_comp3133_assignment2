import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../services/graphql.service'; // adjust if needed

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  onSubmit() {
    this.gql.signup(this.username, this.email, this.password).subscribe({
      next: () => {
        alert('Signup successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup error:', err);
        alert('Signup failed.');
      },
    });
  }
}
