import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Image } from '../model/image';
import { RequestService } from '../request.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService: UserService, private requestService: RequestService,
    private router: Router) { }

  ngOnInit(): void {
    this.imageChosen=false; 
    this.userAdded=false; 
    this.exitFunc=false; 

    this.userService.getNoUserImage().subscribe((image:Image)=>{
      if(image){

        this.noUserImage=image.slika; 
        console.log("dohvacen no user image"); 
        console.log(this.noUserImage); 
      }
    })
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
  noUserImage:string; 

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

 
    if(!this.selectedFile){
      this.userImage=this.noUserImage; 
    }
    else{
      console.log("dohvacen image preko forme"); 
      this.userImage=this.image; 
    }

    if(this.userImage){
      console.log("dohvacen image"); 
    }
    console.log(this.userImage); 

        
    let user = new User();
    user.kor_ime=this.username;
    user.lozinka=this.password;
    user.ime=this.firstname;
    user.prezime=this.lastname;
    user.tip=this.type;
    user.adresa=this.address;
    user.telefon=this.phone;
    user.email=this.email;
    user.status='na cekanju';
    user.slika=this.userImage;

    this.userService.updateUser(user).subscribe(resp=>{
      alert(resp['message'])
    })
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
