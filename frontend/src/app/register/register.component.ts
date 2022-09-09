import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../model/image';
import { User } from '../model/user';
import { RequestService } from '../request.service';
import { UserService } from '../user.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private requestService: RequestService,
    private router: Router) { }

  ngOnInit(): void {
    this.imageChosen=false; 
    this.userAdded=false; 
    this.exitFunc=false; 
    // this.message="Greska!"
  }

  username: string; 
  password: string; 
  password2: string; 
  firstname:string; 
  lastname:string; 
  address:string; 
  phone:string; 
  email:string; 
  image:string; 
  type:string;
  message: string; 
  imageChosen: boolean; 
  status: string; 
  userAdded:boolean; 
  successMessage:string;
  
  exitFunc:boolean;  
  showAlert=false; 
  userImage:string; 

  register(){
    //provera da li su sva polja popunjena 
    this.showAlert=true; 
    if(!this.username || !this.password || !this.password2 || !this.firstname || !this.lastname ||
      !this.address || !this.phone || !this.email || !this.type){
        this.message="Sva polja su obavezna!"; 
        this.userAdded=false;    
        return; 
      }

    if(this.password.localeCompare(this.password2)!=0){
      this.message="Lozinka i potvrda lozinke moraju da budu iste!"; 
      this.userAdded=false;    
      return; 
    }

    if(this.userService.checkPassword(this.password)==false){
      this.message="Lozinka nije u ispravnom formatu!"; 
      this.userAdded=false;    
      return; 
    }

    if(this.userService.checkMobileNumber(this.phone)==false){
      this.message="Broj telefona nije u ispravnom formatu!"; 
      this.userAdded=false;    
      return; 
    }

    this.userService.findUser(this.username).subscribe((user:User)=>{
      if(user!=null){
        this.message="Vec postoji korisnik sa zadatim korisnickim imenom!"; 
        this.userAdded=false; 
        this.exitFunc=true; 

        return; 
      }
    })

    if(!this.userAdded && this.exitFunc)return; 

 
    if(!this.imageChosen){
      this.userService.getNoUserImage().subscribe((image:Image)=>{
        if(image){
          console.log("dohvacen no user image"); 
          this.userImage=image.slika; 
          console.log(this.userImage); 
        }
        else{
          this.message="Greska pri dohvatanju slike!"; 
          this.userAdded=false; 
          this.exitFunc=true; 
  
          return; 
        }
      })
    }
    else{
      console.log("dohvacen no user image"); 
      this.userImage=this.image; 
    }

    console.log(this.userImage); 

        
    this.userService.register(this.username, this.password, this.firstname, 
      this.lastname,this.type, this.address, this.phone, this.email, "na cekanju", this.userImage ).subscribe(
        respObj=>{
          if(respObj['message']=='ok'){
            this.successMessage='Korisnik je dodat'; 
            this.userAdded=true;    
          }
          else{
            this.message='Greska!'
          }
        }
      )
  }

  selectedFile: File;

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = file; 
      this.imageChosen=true; 
      this.image=event.target.result; 
    });

    reader.readAsDataURL(file);
  }

}
