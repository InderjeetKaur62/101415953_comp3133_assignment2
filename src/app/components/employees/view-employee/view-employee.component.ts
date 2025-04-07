import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../../services/graphql.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-employee.component.html',
})
export class ViewEmployeeComponent implements OnInit {
  id = '';
  employee: any;

  constructor(private route: ActivatedRoute, private gql: GraphqlService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.gql.getEmployeeById(this.id).subscribe({
      next: (res) => {
        this.employee = res.data.getEmployeeById;
      },
      error: (err) => console.error('Fetch error:', err),
    });
  }
}
