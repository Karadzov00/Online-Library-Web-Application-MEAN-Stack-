import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  constructor(private router:Router, private booksService:BooksService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.book = JSON.parse(localStorage.getItem('selectedBook')); 
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
  }

  book:Book; 
  user:User; 
  naziv:string;
  autor:string;
  zanr:string;
  izdavac:string;
  godina_izdavanja:number;
  jezik:string;
  broj_uzimanja:number;
  prosecna_ocena:number; 
  na_stanju: number; 
  slika: string; 

  selectedFile: File;
  imageChosen:boolean; 


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = file; 
      this.imageChosen=true; 
      this.slika=event.target.result; 
    });

    reader.readAsDataURL(file);
  }

}
