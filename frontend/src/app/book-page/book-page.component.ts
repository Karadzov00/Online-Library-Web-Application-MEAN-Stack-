import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { BlockLike } from 'typescript';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { BookHistoryObligation } from '../model/bookHistoryObligation';
import { BookObligation } from '../model/bookObligation';
import { Comment } from '../model/comment';
import { MaxDays } from '../model/max_days';
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
    console.log("komentari")
    console.log(this.book.komentari); 
    if(this.book.komentari.length==0){
      this.commentMessage="Trenutno nema komentara za ovu knjigu"
      this.showMessage=true; 
    }

    this.booksService.getMaxDays().subscribe((days:MaxDays)=>{
      this.maxDays=days.max_broj_dana; 
      console.log("max broj dana je")
      console.log(this.maxDays)

    })


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

  comment:string; 
  rating:number; 
  allComments:Comment[]=[]; 

  leftComment:boolean=true; 
  reservedBook:boolean=false; 

  maxDays:number; 

  updatedComment:string; 
  updateTextarea:boolean; 
  

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
    let reserveDate = date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate();


    let date2 = new Date();
    date2.setDate(date2.getDate() + this.maxDays);
    let returnDate = date2.getFullYear()+'-'+(date2.getMonth()+1)+'-'+date2.getDate(); 

    console.log("datum rezervisanja")
    console.log(reserveDate);
    console.log("datum razduzivanja")
    console.log(returnDate);

    let obligation  = new Obligation(); 
    obligation.id=0; 
    obligation.id_knjige=this.book.id; 
    obligation.kor_ime=this.user.kor_ime; 
    obligation.razduzen='ne';
    obligation.datum_zaduzivanja=reserveDate;
    obligation.datum_vracanja=returnDate; 

    console.log(obligation); 

    this.booksService.makeObligation(obligation).subscribe(resp=>{
      alert(resp['message'])
    })

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

  
  commentMessage:string;
  showMessage:boolean;


  addComment(){
    // id:number; 
    // kor_ime:string; 
    // id_knjige:number; 
    // ocena:number;
    // tekst:string; 
    // datum_vreme:string; 

    this.historyBookObligations.forEach(obligation=>{
      if(obligation.id==this.book.id){
        this.reservedBook=true; 
      }
    })

    if(!this.reservedBook){
      console.log("Niste zaduzivali ovu knjigu!")
      this.showMessage=true; 
      this.commentMessage="Niste zaduzivali ovu knjigu!";
      return;
    }

    let commentsLeft; 
    
    this.allComments.forEach(comment=>{
      if(!comment.kor_ime.localeCompare(this.user.kor_ime)){
        commentsLeft++; 
      }
    })
    if(commentsLeft>=1){
      console.log("Vec ste ostavili komentar!")
      this.showMessage=true; 
      this.commentMessage="Vec ste ostavili komentar!";
      return; 
    }

    
    let comm = new Comment(); 
    comm.kor_ime = this.user.kor_ime; 
    comm.id_knjige=this.book.id; 
    comm.ocena= this.rating; 
    comm.tekst = this.comment; 
    comm.datum_vreme = new Date().toLocaleString();
    comm.azuriran='ne'; 

    console.log(comm); 

    this.book.komentari.push(comm); 

    this.booksService.addComment(comm).subscribe(resp=>{
      alert(resp['message']); 
    })

  }

  updateBook(){
    this.router.navigate(['updateBook'])
  }

  showUpdateComment(comment:Comment){
    if(comment.kor_ime.localeCompare(this.user.kor_ime)){
      this.showMessage=true; 
      this.commentMessage="Ne možete da ažurirate komentar koji nije vaš!";
      return;
    }

    this.updateTextarea=true;
     
  }
  
  updateComment(comment:Comment){
    let comm = new Comment(); 
    comm.kor_ime = this.user.kor_ime; 
    comm.id_knjige=this.book.id; 
    comm.ocena= this.rating; 
    comm.tekst = this.comment; 
    comm.datum_vreme = new Date().toLocaleString();
    comm.azuriran='da'; 
  
    console.log(comm); 
    
  }

}
