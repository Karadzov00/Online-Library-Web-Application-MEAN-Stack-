import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { Image } from '../model/image';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.userService.getNoUserImage().subscribe((image:Image)=>{
      if(image){
        this.image=image.slika; 
      }
    }) 
  }


  username: string; 
  password: string; 
  type: string; 
  errorMessage: string; 
  image:string; 
 

  login(){
    this.userService.login(this.username, this.password, this.type).subscribe((user:User)=>{
      if(user){
        localStorage.setItem('loggedUser', JSON.stringify(user)); 
        if(user.tip=='citalac'){
          this.router.navigate(['reader']).
          then(() => {
            window.location.reload();
          });
        }
        else if(user.tip='moderator'){
          this.router.navigate(['reader']).
          then(() => {
            window.location.reload();
          });

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
    localStorage.clear(); 
    this.router.navigate(['']);
  }
  routerRegister(){
    this.router.navigate(['register']);
  }
  

}
