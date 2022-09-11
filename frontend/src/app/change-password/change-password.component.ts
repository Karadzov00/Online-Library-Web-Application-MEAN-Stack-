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

    if(this.userService.checkPassword(this.password2)==false){
      this.message="Uneta lozinka nije u dobrom formatu!"; 
      this.showAlert=true; 
      this.passwordChanged=false; 
      return;
    }

    this.userService.updatePassword(this.user.kor_ime, this.password2).subscribe(
      respObj=>{
        if(respObj['message']=='ok'){
          this.showAlert=true; 
          this.passwordChanged=true; 
          this.message='Lozinka je uspesno promenjena'; 
        }
        else{
          this.showAlert=true; 
          this.passwordChanged=true; 
          this.message='Greska!'
        }
      }
    )

  }

  routerLogin(){
    this.router.navigate(['']);
  }
  routerHome(){
    this.router.navigate(['reader']);
  }
  routerRegister(){
    this.router.navigate(['register']);
  }
  routerProfile(){
    this.router.navigate(['profile']); 
  }
}
