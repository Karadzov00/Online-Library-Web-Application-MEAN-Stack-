import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private router:Router, private booksService:BooksService, private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    console.log(this.user); 
    this.userImage= this.user.slika; 
  }

  changePassword(){
    this.router.navigate(['changePassword']);
  }


  selectedFile: File;
  imageChosen:boolean=false; 
  image:String; 
  imageDB:String; 
  book:Book; 


  user:User; 
  userImage: string; 

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = file; 
      this.imageChosen=true; 
      this.image=event.target.result; 
      console.log(this.image); 
    });

    reader.readAsDataURL(file);
  }



  logout(){
    localStorage.clear(); 
    this.router.navigate(['']);
  }
  routerHome(){
    this.router.navigate(['']);
  }
  routerRegister(){
    this.router.navigate(['register']);
  }
}
