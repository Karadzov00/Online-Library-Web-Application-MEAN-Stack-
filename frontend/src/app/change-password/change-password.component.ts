import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.passwordChanged=false; 
    this.showAlert=false; 

    this.user= JSON.parse(localStorage.getItem('loggedUser')); 
  
  }


  password:string;
  password2:string;
  password3:string;

  passwordChanged:boolean; 
  showAlert:boolean; 

  message:string; 

  user:User; 

  changePassword(){
    if(!this.password || !this.password2 || !this.password3){
      this.message="Sva polja su obavezna!"; 
      this.showAlert=true; 
      this.passwordChanged=false; 
      return;
    }

    if((this.password2.localeCompare(this.password3))){
      this.message="Niste ispravno potvrdili lozinku!"; 
      this.showAlert=true; 
      this.passwordChanged=false; 
      return;
    }

    if(this.user.lozinka.localeCompare(this.password)){
      this.message="Uneta lozinka nije ispravna!"; 
      this.showAlert=true; 
      this.passwordChanged=false; 
      return;
    }

    //updatePassword(); 



  }
}
