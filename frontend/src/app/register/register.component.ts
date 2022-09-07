import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
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

  register(){
    this.userService.register(this.username, this.password, this.firstname, 
      this.lastname, this.address, this.phone, this.email, this.image, this.type).subscribe(
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

    });

    reader.readAsDataURL(file);
  }

}
