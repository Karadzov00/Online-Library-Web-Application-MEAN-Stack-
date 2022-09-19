import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { Obligation } from '../model/obligation';
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

    this.userService.getAdmin().subscribe((admin:User)=>{


      this.user=admin; 
      localStorage.setItem('loggedUser', JSON.stringify(this.user)); 

      console.log(this.user); 
    })

    this.userService.fetchAllUsers().subscribe((allUsers:User[])=>{
      this.users=allUsers; 
      console.log(this.users)
    })

    this.booksService.fetchAllBooks().subscribe((allBooks:Book[])=>{
      this.books=allBooks; 
      console.log(this.books)

    })

    this.userService.fetchAllObligations().subscribe((allObligs:Obligation[])=>{
      this.obligations=allObligs; 
      console.log(this.obligations)

    })
  }

  user:User; 

  users:User[]=[]; 
  books:Book[]=[]; 
  obligations:Obligation[]=[]; 

  showAlert:boolean; 
  message:string; 
  cannotDeleteUser:boolean;
  cannotDeleteBook:boolean;

  maxDays:number; 
  prolongationDays:number; 

  addUser(user:User){
    this.userService.addUser(user).subscribe(resp=>{
      alert(resp['message'])
    })
  }

  updateUser(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.router.navigate(['updateUser']); 
  }

  deleteUser(user:User){
    this.obligations.forEach(elem=>{
      if(!elem.kor_ime.localeCompare(user.kor_ime) && !elem.razduzen.localeCompare('ne')){
        this.message="Ne moze se brisati korisnik koji ima zaduzenu knjigu!"
        this.showAlert=true; 
        this.cannotDeleteUser=true; 
        return;
      }
    })
    if(this.cannotDeleteUser){
      this.cannotDeleteUser=false; 
      return; 
    }

    this.userService.deleteUser(user).subscribe(resp=>{
      alert(resp['message'])
    })

  }

  addBook(){
    this.router.navigate(['addBook']); 
  }

  addNewUser(){
    this.router.navigate(['register']);  
  }

  updateBook(book:Book){
    localStorage.setItem('selectedBook', JSON.stringify(book));
    this.router.navigate(['updateBook']);  
  }

  deleteBook(book:Book){
    this.obligations.forEach(elem=>{
      if(elem.id_knjige==book.id && !elem.razduzen.localeCompare('ne')){
        this.message="Ne moze se brisati knjiga koja nije razduzena!"
        this.showAlert=true; 
        this.cannotDeleteBook=true;
        return; 
      }
    })
    if(this.cannotDeleteBook){
      this.cannotDeleteBook=false; 
      return; 
    }

    this.booksService.deleteBook(book.id).subscribe(resp=>{
      alert(resp['message'])
    })
  }

  changeMaxDays(){
    this.booksService.changeMaxDays(this.maxDays).subscribe(resp=>{
      alert(resp['message'])
    })
  }

  changeProlongationDays(){

  }

  upgradePrivilege(user:User){
    if(!user.tip.localeCompare('moderator')){
      return; 
    }

    this.userService.upgradePrivilege(user).subscribe(resp=>{
      alert(resp['message']); 
    })

  }

  downgradePrivilege(user:User){
    if(!user.tip.localeCompare('citalac')){
      return; 
    }
    this.userService.downgradePrivilege(user).subscribe(resp=>{
      alert(resp['message']); 
    })
  }

  blockUser(user:User){
    this.userService.blockUser(user).subscribe(resp=>{
      alert(resp['message']); 
    })
  }
  
  unblockUser(user:User){
    this.userService.unblockUser(user).subscribe(resp=>{
      alert(resp['message']); 
    })
  }

  

}
