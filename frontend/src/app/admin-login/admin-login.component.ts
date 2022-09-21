import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    localStorage.clear();

  }

  username: string; 
  password: string; 
  errorMessage: string; 

  login(){
    this.userService.login(this.username, this.password, 'admin').subscribe((user:User)=>{
      if(user){
        localStorage.setItem('loggedUser', JSON.stringify(user)); 
  
          this.router.navigate(['admin']).
          then(() => {
            window.location.reload();
          });
        
       }
       else{
        this.errorMessage="Greska!"
       }
  
    })
  }

}
