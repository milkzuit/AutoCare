import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrl: './profile-show.component.css',
})
export class ProfileShowComponent {


  constructor(private http:HttpClient, private router:Router){

    this.MyProfile()
  }

  email="";
  name="";
  address="";
  mobile="";

  MyProfile(){
    let id = localStorage.getItem("user_id");
    this.http.get("http://localhost:8080/getDBUserList/"+id).subscribe({    
        next:(res:any) => {
      console.log(res);
      this.name = res['name'];
      this.address =res['address'];
      this.email = res['email'];
      this.mobile = res['mobile'];
      },
    error:(e) => {
      console.log(e);
    }
  });
  }


  @Output() editClicked = new EventEmitter<void>();

  editProfile() {
    // Emit the event to notify the parent component
    this.editClicked.emit();
    // The parent component can listen to this event in the template using (editClicked)="toggleEditMode()"
    /* 
    this.editClicked.emit(): When this is called (e.g., from the editProfile method), 
    it triggers the editClicked event, and the parent component's method (e.g., toggleEditMode()) will be executed.
    */
  }
}
