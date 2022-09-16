import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
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
        this.requests=books; 
        console.log(this.requests); 
    })
  }

  requests:BookRequest[]
}
