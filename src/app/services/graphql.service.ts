import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private graphqlUrl = 'https://comp3133-assignment2-backend-zwhe.onrender.com/graphql';

  constructor(private http: HttpClient) {}
  signup(username: string, email: string, password: string) {
    const mutation = `
      mutation {
        signup(username: "${username}", email: "${email}", password: "${password}")
      }
    `;
    return this.http.post<any>(this.graphqlUrl, { query: mutation });
  }
  login(email: string, password: string) {
    const query = `
      query {
        login(email: "${email}", password: "${password}")
      }
    `;
    return this.http.post<any>(this.graphqlUrl, { query });
  }
  
  
  addEmployee(
    firstName: string,
    lastName: string,
    emailId: string,
    gender: string,
    designation: string,
    salary: number,
    dateOfJoining: string,
    department: string,
    employeePhoto: string
  ) {
    const mutation = `
      mutation {
        addEmployee(
          first_name: "${firstName}",
          last_name: "${lastName}",
          email: "${emailId}",
          gender: "${gender}",
          designation: "${designation}",
          salary: ${salary},
          date_of_joining: "${dateOfJoining}",
          department: "${department}",
          employee_photo: "${employeePhoto}"
        )
      }
    `;
    return this.http.post<any>(this.graphqlUrl, { query: mutation });
  }
  

  getAllEmployees() {
    const query = `
      query {
        getAllEmployees {
          _id
          first_name
          last_name
          email
        }
      }
    `;
    return this.http.post<any>(this.graphqlUrl, { query });
  }

  getEmployeeById(id: string) {
    const query = `
      query {
        getEmployeeById(id: "${id}") {
          _id
          first_name
          last_name
          email
          gender
          designation
          department
          salary
          date_of_joining
          employee_photo
        }
      }
    `;
    return this.http.post<any>(this.graphqlUrl, { query });
  }
  

  updateEmployee(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    designation: string,
    salary: number,
    dateOfJoining: string,
    department: string,
    employeePhoto: string
  ) {
    const mutation = `
      mutation {
        updateEmployee(
          id: "${id}",
          first_name: "${firstName}",
          last_name: "${lastName}",
          email: "${email}",
          gender: "${gender}",
          designation: "${designation}",
          salary: ${salary},
          date_of_joining: "${dateOfJoining}",
          department: "${department}",
          employee_photo: "${employeePhoto}"
        )
      }
    `;
    return this.http.post<any>(this.graphqlUrl, { query: mutation });
  }
  
  deleteEmployee(id: string) {
    const mutation = `
      mutation {
        deleteEmployee(id: "${id}")
      }
    `;
    return this.http.post<any>(this.graphqlUrl, { query: mutation });
  }
  searchEmployees(designation: string, department: string) {
    const query = `
      query {
        searchEmployees(
          designation: "${designation}",
          department: "${department}"
        ) {
          _id
          first_name
          last_name
          email
          designation
          department
        }
      }
    `;
    return this.http.post<any>(this.graphqlUrl, { query });
  }
  
}
