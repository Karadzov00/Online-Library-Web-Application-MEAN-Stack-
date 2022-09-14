import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { BookHistoryObligation } from '../model/bookHistoryObligation';
import { BookObligation } from '../model/bookObligation';
import { Obligation } from '../model/obligation';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-obligation-history',
  templateUrl: './obligation-history.component.html',
  styleUrls: ['./obligation-history.component.css']
})
export class ObligationHistoryComponent implements OnInit {

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

            this.historyBookObligations.sort((a,b)=>{
              if ( a.datum_vracanja < b.datum_vracanja ){
                return 1;
              }
              if ( a.datum_vracanja > b.datum_vracanja ){
                return -1;
              }
              return 0;
            })

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

  sortCriteria:number=1; 
  sortType:number=1; 

  redirectBook(id){
    this.booksService.getBookById(id).subscribe((book:Book)=>{
      console.log("book redirect")
      console.log(book);
      localStorage.setItem('selectedBook', JSON.stringify(book));
      this.router.navigate(['book']);  
    })

  }

  sort(){
    if(this.sortCriteria==1){
      this.sortByName(); 
    }      
    else if(this.sortCriteria==2){
      this.sortByAuthor()
    }
    else if(this.sortCriteria==3){
      this.sortByDateTaken()
    }
    else if(this.sortCriteria==4){
      this.sortByDateReturned()
    }


  }

  sortByName(){
    this.historyBookObligations.sort((a,b)=>{
      if ( a.naziv < b.naziv ){
        return -1;
      }
      if ( a.naziv > b.naziv ){
        return 1;
      }
      return 0;
    })
  }
  
  sortByAuthor(){
    this.historyBookObligations.sort((a,b)=>{
      if ( a.autor < b.autor ){
        return -1;
      }
      if ( a.autor > b.autor ){
        return 1;
      }
      return 0;
    })
    
  }

  sortByDateTaken(){
    this.historyBookObligations.sort((a,b)=>{
      let date1 = new Date(a.datum_zaduzivanja); 
      let date2 = new Date(b.datum_zaduzivanja); 
      if ( date1 < date2 ){
        return -1;
      }
      if ( date1 > date2 ){
        return 1;
      }
      return 0;
    })
  }

  sortByDateReturned(){
    this.historyBookObligations.sort((a,b)=>{
      if ( a.datum_vracanja < b.datum_vracanja ){
        return -1;
      }
      if ( a.datum_vracanja > b.datum_vracanja ){
        return 1;
      }
      return 0;
    })
  }
}
