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


    this.date= new Date().toLocaleDateString();
    console.log(this.date); 

    this.booksService.checkInsertDate(this.date).subscribe((id:Number)=>{

      this.randomId=id.valueOf(); 
      
      console.log("random id je"); 
      console.log(this.randomId); 
     
      this.booksService.getBookById(this.randomId).subscribe((book:Book)=>{
        console.log("knjiga dana je ")
        console.log(book); 
        this.dailyBook=book;
      })
     
      
    })

  }

 
  date: string; 
  currentRate = 8;

  dateExists:boolean; 

  selectedFile: File;
  imageChosen:boolean=false; 
  image:String; 
  imageDB:String; 
  dailyBook:Book; 

  maxId:number;
  randomId:number;  


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
    this.router.navigate(['reader']);
  }
  routerProfile(){
    this.router.navigate(['profile']);
  }
  changePassword(){
    this.router.navigate(['changePassword']);
  }
  

}
