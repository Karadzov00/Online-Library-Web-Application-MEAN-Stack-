import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { BookRequest } from '../model/bookRequest';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private router:Router, private booksService:BooksService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.book = JSON.parse(localStorage.getItem('selectedBook')); 
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    if(!this.user.tip.localeCompare('moderator')){
      this.moderator=true; 
      console.log(this.moderator)
    }
    console.log(this.user.tip)

    
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
  moderator:boolean; 
  


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

  addBook(){
    let newBook = new Book(); 
    newBook.id=0; 
    newBook.naziv=this.naziv!=null?this.naziv:this.book.naziv; 
    newBook.autor=this.autor!=null?this.autor:this.book.autor; 
    newBook.zanr=this.zanr!=null?this.zanr:this.book.zanr; 
    newBook.izdavac=this.izdavac; 
    newBook.godina_izdavanja=this.godina_izdavanja; 
    newBook.jezik=this.jezik; 
    newBook.broj_uzimanja=this.broj_uzimanja; 
    newBook.prosecna_ocena=this.prosecna_ocena; 
    newBook.na_stanju=this.na_stanju; 
    newBook.slika=(this.slika!=null)?this.slika:this.book.slika; 

    console.log(newBook); 

    this.booksService.addBook(newBook).subscribe(resp=>{
      alert(resp['message'])
    })

    
  }


  suggestBook(){
    let newBook = new BookRequest(); 
    newBook.id=0; 
    newBook.kor_ime=this.user.kor_ime; 
    newBook.naziv=this.naziv!=null?this.naziv:this.book.naziv; 
    newBook.autor=this.autor!=null?this.autor:this.book.autor; 
    newBook.zanr=this.zanr!=null?this.zanr:this.book.zanr; 
    newBook.izdavac=this.izdavac; 
    newBook.godina_izdavanja=this.godina_izdavanja; 
    newBook.jezik=this.jezik; 
    newBook.broj_uzimanja=this.broj_uzimanja; 
    newBook.prosecna_ocena=this.prosecna_ocena; 
    newBook.na_stanju=this.na_stanju; 
    newBook.slika=(this.slika!=null)?this.slika:this.book.slika; 

    console.log(newBook); 

    this.booksService.suggestBook(newBook).subscribe(res=>{
      alert(res['message'])
    })


  }
}
