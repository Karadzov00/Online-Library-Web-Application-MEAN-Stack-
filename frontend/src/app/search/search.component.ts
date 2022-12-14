import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { UserService } from '../user.service';
import {FormControl} from '@angular/forms';
import { searchBookAdvanced } from '../model/searchBookAdvanced';
import { User } from '../model/user';
import { BlockLike } from 'typescript';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router, private booksService: BooksService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 

    if(this.user){
      this.userService.checkBlockStatus(this.user).subscribe((blocked:string)=>{
        if(!blocked.localeCompare('da')){
          this.userBlocked=true; 
        }
        else{
          this.userBlocked=false; 
        }
      })
    }
  }

  user:User;

  userBlocked:boolean; 

  name:string; 
  author:string;

  message: string;
  showAlert:boolean;
  searched: boolean; 
  
  books:Book[]; 

  yearFrom:number; 
  yearTo:number; 
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
    

    let srch = new searchBookAdvanced(); 
    srch.autor=this.author;
    srch.naziv=this.name;
    srch.godina_od=this.yearFrom;
    srch.godina_do=this.yearTo;
    srch.izdavac=this.publisher; 

    console.log(this.genre.value); 
    srch.zanr=this.genre.value; 
    console.log(srch.zanr);

    this.booksService.advancedSearch(srch).subscribe((books:Book[])=>{
      this.books=books; 
      console.log(this.books); 
      this.showAlert=false; 
      this.searched=true; 
      });
  }

  bookRedirect(book){
    if(this.userBlocked)return; 
    console.log("book redirect")
    console.log(book);
    localStorage.setItem('selectedBook', JSON.stringify(book));
    this.router.navigate(['book']);  

  }

}
