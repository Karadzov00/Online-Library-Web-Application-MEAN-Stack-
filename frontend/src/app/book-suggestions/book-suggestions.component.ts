import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { BookRequest } from '../model/bookRequest';
import { UserService } from '../user.service';

@Component({
  selector: 'app-book-suggestions',
  templateUrl: './book-suggestions.component.html',
  styleUrls: ['./book-suggestions.component.css']
})
export class BookSuggestionsComponent implements OnInit {

  constructor(private router:Router, private booksService:BooksService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.booksService.fetchBookSuggestions().subscribe((books:BookRequest[])=>{
      this.allRequests=books; 
        books.forEach(elem=>{
          if(!elem.status.localeCompare('na cekanju')){
            this.requests.push(elem);
          }
        })
    })
  }

  requests:BookRequest[]=[]; 
  allRequests:BookRequest[]=[]; 
  


  addBook(request:BookRequest){
    let newBook = new Book(); 
    newBook.id=0; 
    newBook.naziv=request.naziv; 
    newBook.autor=request.autor; 
    newBook.zanr=request.zanr; 
    newBook.izdavac=request.izdavac; 
    newBook.godina_izdavanja=request.godina_izdavanja; 
    newBook.jezik=request.jezik; 
    newBook.broj_uzimanja=request.broj_uzimanja; 
    newBook.prosecna_ocena=request.prosecna_ocena; 
    newBook.na_stanju=request.na_stanju; 
    newBook.slika=request.slika; 

    console.log(newBook); 
    
    
    this.booksService.acceptSuggestion(request).subscribe(resp=>{
      alert(resp['message'])
    })
    let index = this.requests.indexOf(request);
    this.requests.splice(index, 1);
    
    
    this.booksService.addBook(newBook).subscribe(resp=>{
      alert(resp['message'])
    })
  }
}
