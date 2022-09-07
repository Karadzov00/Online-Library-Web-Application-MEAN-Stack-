import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { UserService } from '../user.service';


export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

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

  register(){
    //provera da li su sva polja popunjena 
    if(!this.username || !this.password || !this.password2 || !this.firstname || !this.lastname ||
      !this.address || !this.phone || !this.email || !this.type){
        this.message="Sva polja su obavezna!"; 
        return; 
      }

    if(this.password.localeCompare(this.password2)!=0){
      this.message="Lozinka i potvrda lozinke moraju da budu iste!"; 
      return; 
    }

    if(this.userService.checkPassword(this.password)==false){
      this.message="Lozinka nije u ispravnom formatu!"; 
      return; 
    }
    

    this.userService.register(this.username, this.password, this.firstname, 
      this.lastname,this.type, this.address, this.phone, this.email, "na cekanju", this.image ).subscribe(
        respObj=>{
          if(respObj['message']=='ok'){
            this.message='User added'         
          }
          else{
            this.message='Error'
          }
        }
      )
  }

  selectedFile: ImageSnippet;

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageChosen=true; 

    });


    reader.readAsDataURL(file);
  }

}
