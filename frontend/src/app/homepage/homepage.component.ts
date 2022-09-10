import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { Image } from '../model/image';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router, private booksService: BooksService, private userService:UserService ) { }

  ngOnInit(): void {
    this.booksService.getTop3Books().subscribe((books:Book[])=>{
      this.books=books; 
      // console.log(books); 
      this.images = [
        books[0].slika,
        books[1].slika,
        books[2].slika
      ]
    });
    
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    this.userService.getNoUserImage().subscribe((image:Image)=>{
      if(image){
        this.noUserImage=image.slika; 
        // console.log("dohvacen no user image"); 
        // console.log(this.noUserImage); 
      }
    })
    if(!this.user){
      this.image=this.noUserImage;
      // console.log("setovan no user image")
    }
    else{
      this.image=this.user.slika;

    }
  }

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  images: String[]; 
  user: User; 
  noUserImage:string;
  image:string; 

  books: Book[]; 

  routerLogin(){
    this.router.navigate(['login']);
  }
  routerHome(){
    this.router.navigate(['']);
  }
  routerRegister(){
    this.router.navigate(['register']);
  }
  logout(){
    localStorage.clear(); 
    this.user=null;
    this.image=this.noUserImage; 
    this.router.navigate(['']);
  }


}
