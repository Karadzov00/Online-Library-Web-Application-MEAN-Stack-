import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from './model/image';
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
    
    if(this.user){
      this.userService.checkBlockStatus(this.user).subscribe((blocked:string)=>{
        if(!blocked.localeCompare('da')){
          this.userBlocked=true; 
        }
        else{
          this.userBlocked=false; 
        }
      })
    }

    this.userService.getNoUserImage().subscribe((image:Image)=>{
      this.noUserImage=image.slika; 
    })

    if(this.user){
      this.loggedIn=true; 
    }
    
  }
  user:User; 
  loggedIn:boolean;
  noUserImage:String; 

  userBlocked:boolean; 

  routerLogin(){
    this.router.navigate(['login']);
  }
  routerHome(){
    if(this.user){
      this.router.navigate(['reader']);
    }
    else{
      this.router.navigate(['homepage']);
    }
  }
  routerRegister(){
    this.router.navigate(['register']);
  }
  logout(){
    localStorage.clear(); 
    this.router.navigate(['homepage']).
    then(() => {
      window.location.reload();
    });
  }
  routerProfile(){
    this.router.navigate(['profile']);
  }
  changePassword(){
    if(this.userBlocked)return; 

    this.router.navigate(['changePassword']);
  }
  routerSearch(){
    this.router.navigate(['search']);
  }
  routerObligations(){

    this.router.navigate(['obligations']);
  }
  routerObligationHistory(){
    this.router.navigate(['obligationHistory']);
  }

  addBook(){
    if(this.userBlocked)return; 

    this.router.navigate(['addBook']);
  }

  suggestions(){
    if(this.userBlocked)return; 

    this.router.navigate(['bookSuggestions']);

  }


}
