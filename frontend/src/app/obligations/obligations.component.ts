import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { BookHistoryObligation } from '../model/bookHistoryObligation';
import { BookObligation } from '../model/bookObligation';
import { MaxDays } from '../model/max_days';
import { Obligation } from '../model/obligation';
import { Prolongation } from '../model/prolongation';
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

    this.booksService.fetchProlongations().subscribe((prols:Prolongation[])=>{
      this.prolongations=prols; 
      console.log(this.prolongations); 
    })

    this.booksService.getProlongationDays().subscribe((days:MaxDays)=>{
      this.prolongationDays=days.max_broj_dana; 
    })

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

  allObligations: Obligation[]; 
  currObligations:Obligation[]=[]; 

  userBlocked:boolean; 

  allBooks:Book[]=[]; 
  currBooks:Book[]=[]; 
  bookObligations:BookObligation[]=[]; 
  historyBookObligations:BookHistoryObligation[]=[]; 

  user: User; 
  deadlinePassed:boolean; 
  haveObligations:boolean; 

  maxDays:number; 
  prolongationDays:number; 
  prolongations:Prolongation[]=[]; 

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
    

    this.allObligations.forEach(elem=>{
      if(!elem.kor_ime.localeCompare(this.user.kor_ime) 
      && !elem.razduzen.localeCompare('ne') && elem.id_knjige==id){
        
        let prolongation = new Prolongation(); 
        prolongation.id_knjige=id; 
        prolongation.id_zaduzenja=elem.id; 
        prolongation.kor_ime=this.user.kor_ime; 


        let date2 = new Date(elem.datum_vracanja);

        date2.setDate(date2.getDate() + this.prolongationDays);
        console.log(this.prolongationDays); 
        let returnDate = date2.getFullYear()+'-'+(date2.getMonth()+1)+'-'+date2.getDate(); 
        console.log(returnDate); 
        
        prolongation.novi_datum=returnDate; 

        console.log(prolongation);
        this.booksService.addProlongation(prolongation).subscribe(resp=>{
          alert(resp['message']); 
        }) 

      }
    })

    
  }

  
  checkExtended(id):boolean{

    for (var fieldIndex = 0; fieldIndex < this.prolongations.length; fieldIndex ++){
      var field = this.prolongations[fieldIndex];
      if(field.id_knjige== id && !field.kor_ime.localeCompare(this.user.kor_ime))
      return false; 
    }
    return true; 
  }



}
