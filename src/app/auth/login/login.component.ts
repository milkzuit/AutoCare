import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http:HttpClient , private router:Router){
   }

  email="";
  password="";
  serverMsg="hello"


  loginvalidate(){
    let data = {
      "email":this.email,
      "password":this.password
    }
    this.http.post("http://localhost:8080/login",data).subscribe({    
        next:(res:any) => {
      console.log(res);
      localStorage.setItem("status","1");
      localStorage.setItem("user_id",res['id']);
      this.router.navigateByUrl('/prof');
      

    },
    error:(e) => {
      alert("no user Found");
      console.log(e);
      this.serverMsg = e['error']['msg']
    }
  });
  }

  
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////
