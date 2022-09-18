import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { BookHistoryObligation } from '../model/bookHistoryObligation';
import { BookObligation } from '../model/bookObligation';
import { MaxDays } from '../model/max_days';
import { Obligation } from '../model/obligation';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-obligations',
  templateUrl: './obligations.component.html',
  styleUrls: ['./obligations.component.css']
})
export class ObligationsComponent implements OnInit {

  constructor(private router:Router, private userService:UserService,
    private booksService: BooksService) { }

  ngOnInit(): void {
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

  allObligations: Obligation[]; 
  currObligations:Obligation[]=[]; 

  allBooks:Book[]=[]; 
  currBooks:Book[]=[]; 
  bookObligations:BookObligation[]=[]; 
  historyBookObligations:BookHistoryObligation[]=[]; 

  user: User; 
  deadlinePassed:boolean; 
  haveObligations:boolean; 

  maxDays:number; 

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

  redirectBook(id){
    this.booksService.getBookById(id).subscribe((book:Book)=>{
      console.log("book redirect")
      console.log(book);
      localStorage.setItem('selectedBook', JSON.stringify(book));
      this.router.navigate(['book']);  
    })

  }

  returnBook(id){
    console.log(id); 
    this.allObligations.forEach(elem=>{
      if(!elem.kor_ime.localeCompare(this.user.kor_ime) 
      && !elem.razduzen.localeCompare('ne') && elem.id_knjige==id){
        console.log(elem.id); 
        let date1 = new Date(); 
        let returnDate = date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate();
        this.booksService.returnBook(elem.id, this.user.kor_ime, elem.id_knjige,returnDate).subscribe(res=>{
          alert(res['message']); 
        })

      }
    })
    
  }

  extendDeadline(id){
    this.booksService.getMaxDays().subscribe((days:MaxDays)=>{
      this.maxDays=days.max_broj_dana; 
      console.log("max broj dana je")
      console.log(this.maxDays)
    })
    
  }

}
