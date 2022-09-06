import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }


  username: string; 
  password: string; 
  type: string; 
  errorMessage: string; 


  contactRedirect(){

  }

  aboutUsRedirect(){

  }

  login(){
    
  }

}
