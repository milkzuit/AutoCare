import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})  
  export class RegisterComponent {
    constructor(private http: HttpClient, private router:Router) {}
  
    name = '';
    address = '';
    email = '';
    password = '';
    serverMsg = 'error';
  
    register() {
      let data = {
        name: this.name,
        address: this.address,
        email: this.email,
        password: this.password,
      };
  
      this.http.post("http://localhost:8080/userRegister", data).subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.setItem("status", "1")
          alert("User Registration Successfull");
          this.router.navigateByUrl('/login')
        },
        error: (e) => {
          console.log(e);
          this.serverMsg = e['error']['msg'] || 'Registration failed. Please try again later.';
        }
      });
    }
  }
