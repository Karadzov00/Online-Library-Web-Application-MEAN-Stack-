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
    this.date= new Date().toLocaleDateString();
    

    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    console.log(this.user); 
    this.userImage= this.user.slika; 
    this.booksService.fetchAllBooks().subscribe((books:Book[])=>{

      let maxId = books.length; 
      this.maxId = maxId; 


      this.randomId=  Math.floor(Math.random() * (this.maxId + 1));

      this.booksService.getBookById(this.randomId).subscribe((book:Book)=>{
        console.log("knjiga dana je ")
        console.log(book); 
        this.dailyBook=book;
        console.log("id");
        console.log(this.dailyBook.id);

        console.log("Broj uzimanja");
        console.log(this.dailyBook.broj_uzimanja); 
        console.log("zanr");
        console.log(this.dailyBook.zanr); 
        console.log("Prosecna ocena je");
        console.log(this.dailyBook.prosecna_ocena);
        console.log("Na stanju");
        console.log(this.dailyBook.na_stanju);

      })


    })
  }

 
  date: string; 

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
