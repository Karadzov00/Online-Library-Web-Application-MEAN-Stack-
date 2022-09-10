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
    this.images = [`assets/atomic_habits`, `assets/hari_poter1`, `assets/hari_poter2`];
    
  }

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  images: string[]; 


  books: Book[]; 

}
