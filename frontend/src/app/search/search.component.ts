import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { UserService } from '../user.service';
import {FormControl} from '@angular/forms';
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

  message: string;
  showAlert:boolean;
  searched: boolean; 
  
  books:Book[]; 

  yearFrom:string; 
  yearTo:string; 
  publisher:string; 

  genre = new FormControl('');
  genreList: string[] = ['roman', 'popularna psihologija','naucna fantastika','triler', 'klasik'];
  
  search(){
    if(!this.name && !this.author){
      this.message="Morate uneti makar jedno polje!"
      this.showAlert=true; 
      return; 
    }

    this.booksService.searchBooks(this.name, this.author).subscribe((books:Book[])=>{
      this.books=books; 
      this.showAlert=false; 
      this.searched=true; 

    })

  }

  advancedSearch(){

  }

  bookRedirect(book){
    console.log("book redirect")
    console.log(book);
    localStorage.setItem('selectedBook', JSON.stringify(book));
    this.router.navigate(['book']);  

  }

}
