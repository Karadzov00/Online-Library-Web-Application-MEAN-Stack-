import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router, private booksService: BooksService,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  name:string; 
  author:string;
  
  search(){

  }

}
