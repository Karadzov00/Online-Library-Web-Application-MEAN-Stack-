import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router, private userService:UserService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    if(!this.user){
      this.userService.getNoUserImage().subscribe((image:any)=>{
        this.noUserImage=image; 
      })
    }
    
  }
  user:User; 
  noUserImage:String; 

  routerLogin(){
    this.router.navigate(['login']);
  }
  routerHome(){
    this.router.navigate(['homepage']);
  }
  routerRegister(){
    this.router.navigate(['register']);
  }
  logout(){
    localStorage.clear(); 
    this.router.navigate(['']);
  }
  routerProfile(){
    this.router.navigate(['profile']);
  }
  changePassword(){
    this.router.navigate(['changePassword']);
  }


}
