import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    localStorage.clear(); 
  }


  username: string; 
  password: string; 
  type: string; 
  errorMessage: string; 
 

  login(){
    this.userService.login(this.username, this.password, this.type).subscribe((user:User)=>{
      if(user){
        localStorage.setItem('loggedUser', JSON.stringify(user)); 
        if(user.tip=='citalac'){
          this.router.navigate(['reader']);
        }
        else if(user.tip='moderator'){
          this.router.navigate(['moderator']);

        }
        else{
          this.errorMessage='Greska!'; 
        }
      }
      else{
        this.errorMessage='Greska!'; 
      }
    })
  

  }


  routerLogin(){
    this.router.navigate(['login']);
  }
  routerHome(){
    this.router.navigate(['']);
  }
  routerRegister(){
    this.router.navigate(['register']);
  }
  

}
