import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private router:Router, private booksService:BooksService) { }

  ngOnInit(): void {
    this.booksService.getAtomicHabits().subscribe((book:Book)=>{
      if(book){
        this.book=book; 
        this.imageDB=book.slika;
        
        console.log("knjiga dohvacena!"); 
        console.log(book); 
      }
    })
  }

  changePassword(){
    this.router.navigate(['changePassword']);
  }


  selectedFile: File;
  imageChosen:boolean=false; 
  image:String; 
  imageDB:String; 
  book:Book; 

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = file; 
      this.imageChosen=true; 
      this.image=event.target.result; 
      console.log(this.image); 
    });

    reader.readAsDataURL(file);
  }
}
