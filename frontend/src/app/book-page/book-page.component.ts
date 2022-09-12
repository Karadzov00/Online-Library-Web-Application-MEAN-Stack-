import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  constructor(private router:Router, private booksService:BooksService) { }

  ngOnInit(): void {
    this.book = JSON.parse(localStorage.getItem('selectedBook')); 
  }

  book:Book; 

}
