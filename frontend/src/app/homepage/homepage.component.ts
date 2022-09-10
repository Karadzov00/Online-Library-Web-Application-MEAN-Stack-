import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router, private booksService: BooksService ) { }

  ngOnInit(): void {
    this.booksService.getTop3Books().subscribe((books:Book[])=>{
      this.books=books; 
      console.log(books); 
      this.images = [
        books[0].slika,
        books[1].slika,
        books[2].slika
      ]
    })  
  }

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  images: String[]; 

  books: Book[]; 



}
