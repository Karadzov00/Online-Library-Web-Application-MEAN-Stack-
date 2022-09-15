import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router, private userService: UserService,
    private booksService:BooksService) { }

  ngOnInit(): void {
    this.userService.fetchAllUsers().subscribe((allUsers:User[])=>{
      this.users=allUsers; 
      console.log(this.users)
    })

    this.booksService.fetchAllBooks().subscribe((allBooks:Book[])=>{
      this.books=allBooks; 
      console.log(this.books)

    })
  }

  users:User[]=[]; 
  books:Book[]=[]; 

  addUser(user){

  }

  updateUser(user){

  }

  deleteUser(user){
    
  }

  addBook(book){

  }

  updateBook(book){

  }

  deleteBook(book){

  }

}
