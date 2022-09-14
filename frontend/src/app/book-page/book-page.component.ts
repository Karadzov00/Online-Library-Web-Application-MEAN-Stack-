import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { BookHistoryObligation } from '../model/bookHistoryObligation';
import { BookObligation } from '../model/bookObligation';
import { Obligation } from '../model/obligation';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  constructor(private router:Router, private booksService:BooksService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.book = JSON.parse(localStorage.getItem('selectedBook')); 
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    this.userService.getObligations(this.user.kor_ime).subscribe((obligs:Obligation[])=>{
      this.allObligations=obligs; 
      console.log("sva zaduzenja");
      console.log(this.allObligations)
      if(this.allObligations){
        this.allObligations.forEach(elem=>{

          
          var local_book:Book; 
          
          this.booksService.getBookById(elem.id_knjige).subscribe((book:Book)=>{
            local_book=book; 
            
            this.allBooks.push(local_book);
            console.log(local_book); 

            let historyObl: BookHistoryObligation = new BookHistoryObligation(); 
            historyObl.id=book.id; 
            historyObl.autor=book.autor; 
            historyObl.naziv=book.naziv; 
            historyObl.datum_zaduzivanja=elem.datum_zaduzivanja;
            historyObl.datum_vracanja=elem.datum_vracanja; 
            console.log(historyObl); 
            
            this.historyBookObligations.push(historyObl); 

            
            if(!elem.razduzen.localeCompare('ne')){
              // console.log(elem.datum_zaduzivanja);
              let days = this.calculateDays(elem); 
              let bookObl: BookObligation = new BookObligation(); 
              
              bookObl.autor=book.autor; 
              bookObl.naziv=book.naziv;
              bookObl.slika=book.slika; 
              bookObl.broj_dana=days; 
              bookObl.id=book.id; 
              console.log(bookObl); 
              
              let obl: Obligation = elem;  
              this.currObligations.push(obl);
              this.currBooks.push(local_book); 

              this.bookObligations.push(bookObl); 
              this.haveObligations=true; 
            }
          })


        })

      }
    })
  }

  book:Book; 

  allObligations: Obligation[]; 
  currObligations:Obligation[]=[]; 

  allBooks:Book[]=[]; 
  currBooks:Book[]=[]; 
  bookObligations:BookObligation[]=[]; 
  historyBookObligations:BookHistoryObligation[]=[]; 

  user: User; 
  deadlinePassed:boolean; 
  haveObligations:boolean; 

  cannotReserve:boolean=false; 
  message:string; 
  showAlert:boolean; 

  reserveBook(){

    //fetch all obligations and books 
    this.userService.getObligations(this.user.kor_ime).subscribe((obligs:Obligation[])=>{
      this.allObligations=obligs; 
      // console.log("sva zaduzenja");
      // console.log(this.allObligations)
      if(this.allObligations){
        this.allObligations.forEach(elem=>{

          
          var local_book:Book; 
          
          this.booksService.getBookById(elem.id_knjige).subscribe((book:Book)=>{
            local_book=book; 
            
            this.allBooks.push(local_book);
            // console.log(local_book); 

            let historyObl: BookHistoryObligation = new BookHistoryObligation(); 
            historyObl.id=book.id; 
            historyObl.autor=book.autor; 
            historyObl.naziv=book.naziv; 
            historyObl.datum_zaduzivanja=elem.datum_zaduzivanja;
            historyObl.datum_vracanja=elem.datum_vracanja; 
            // console.log(historyObl); 
            
            this.historyBookObligations.push(historyObl); 

            
            if(!elem.razduzen.localeCompare('ne')){
              // console.log(elem.datum_zaduzivanja);
              let days = this.calculateDays(elem); 
              let bookObl: BookObligation = new BookObligation(); 
              
              bookObl.autor=book.autor; 
              bookObl.naziv=book.naziv;
              bookObl.slika=book.slika; 
              bookObl.broj_dana=days; 
              bookObl.id=book.id; 
              // console.log(bookObl); 
              
              let obl: Obligation = elem;  
              this.currObligations.push(obl);
              this.currBooks.push(local_book); 

              this.bookObligations.push(bookObl); 
              this.haveObligations=true; 
            }
          })


        })

      }
    })



    let book_id = this.book.id; 
    this.currObligations.forEach(elem=>{
      if(elem.id_knjige == this.book.id){
        this.cannotReserve=true; 
        this.message="Već posedujete ovu knjigu!"
        this.showAlert=true; 
      }
    })
    if(this.cannotReserve)return; 

    if(this.currObligations.length>=3){
      this.message="Imate maksimalne 3 zadužene knjige!"
      this.showAlert=true; 
      return; 
    }

    this.bookObligations.forEach(elem=>{
      if(elem.broj_dana<0){
        this.cannotReserve=true; 
        this.message="Imate knjige kojima je istekao rok za vraćanje!"
        this.showAlert=true; 
      }
    })
    if(this.cannotReserve)return; 

    if(this.book.na_stanju<1){
      this.cannotReserve=true; 
      this.message="Nema dovoljno knjiga na stanju!"
      this.showAlert=true; 
      return; 
    }

    let date1 = new Date(); 
    let reserveDate = date1.getFullYear()+'-'+date1.getMonth()+'-'+date1.getDate(); 
    let date2 = new Date(Date.now() + 12096e5);
    let returnDate = date2.getFullYear()+'-'+date2.getMonth()+'-'+date2.getDate(); 

    console.log("datum rezervisanja")
    console.log(reserveDate);
    console.log("datum razduzivanja")
    console.log(returnDate);

    let obligation  = new Obligation(); 
    obligation.id_knjige=this.book.id; 
    obligation.kor_ime=this.user.kor_ime; 
    obligation.razduzen='ne';
    obligation.datum_zaduzivanja=reserveDate;
    obligation.datum_vracanja=returnDate; 


  }

  calculateDays(obligation:Obligation):number{
    let today= new Date();

    let date1: Date = new Date(obligation.datum_vracanja);
    let date2: Date = new Date(obligation.datum_zaduzivanja);

    let daysBetweenDates: number

    if(date1<=today){
      let timeInMilisec: number =  date1.getTime()-today.getTime();
      daysBetweenDates = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
      this.deadlinePassed=true; 
    }
    else{
      let timeInMilisec: number = date1.getTime() - date2.getTime();
      daysBetweenDates = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
      this.deadlinePassed=false; 
    }
    return daysBetweenDates; 
    
  }

}
