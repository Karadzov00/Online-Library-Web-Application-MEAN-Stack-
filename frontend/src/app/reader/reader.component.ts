import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { BookHistoryObligation } from '../model/bookHistoryObligation';
import { BookObligation } from '../model/bookObligation';
import { BookRequest } from '../model/bookRequest';
import { Obligation } from '../model/obligation';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private router:Router, private booksService:BooksService, private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    this.book = JSON.parse(localStorage.getItem('selectedBook')); 
    console.log(this.user); 
    this.userImage= this.user.slika; 

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

    this.booksService.fetchBookSuggestions().subscribe((requests:BookRequest[])=>{
      requests.forEach(elem=>{
        if(!elem.kor_ime.localeCompare(this.user.kor_ime) && !elem.status.localeCompare('odobren')){
          console.log("odobren")
          this.bookAccepted=true; 
        }
      })
    })


    this.date= new Date().toLocaleDateString();
    console.log(this.date); 

    this.booksService.checkInsertDate(this.date).subscribe((id:Number)=>{

      this.randomId=id.valueOf(); 
      
      console.log("random id je"); 
      console.log(this.randomId); 
     
      this.booksService.getBookById(this.randomId).subscribe((book:Book)=>{
        console.log("knjiga dana je ")
        console.log(book); 
        this.dailyBook=book;
      })
     
      
    })

    //generate notifications 

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
              console.log(elem.id_knjige);
              console.log(days);
              if(days<=2 && days>=0){
                this.notifMessage1+="Ističe vam rok za vraćanje knjige "+book.naziv+"!   ";
              }
              else if(days<0){
                this.notifMessage2+="Istekao vam je rok za vraćanje knjige "+book.naziv+"!   ";
              }
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


  }

  notifMessage1:string=""; 
  notifMessage2:string=""; 

  userBlocked:boolean; 
  bookAccepted:boolean; 

  book:Book; 
  date: string; 
  currentRate = 8;

  dateExists:boolean; 

  selectedFile: File;
  imageChosen:boolean=false; 
  image:String; 
  imageDB:String; 
  dailyBook:Book; 

  maxId:number;
  randomId:number;  


  user:User; 
  userImage: string; 


  allObligations: Obligation[]; 
  currObligations:Obligation[]=[]; 

  allBooks:Book[]=[]; 
  currBooks:Book[]=[]; 
  bookObligations:BookObligation[]=[]; 
  historyBookObligations:BookHistoryObligation[]=[]; 

  deadlinePassed:boolean; 
  haveObligations:boolean; 

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = file; 
      this.imageChosen=true; 
      this.image=event.target.result; 
      // console.log(this.image); 
    });

    reader.readAsDataURL(file);
  }

  calculateDays(obligation:Obligation):number{
    let today= new Date();

    let date1: Date = new Date(obligation.datum_vracanja);
    let date2: Date = new Date(obligation.datum_zaduzivanja);

    let daysBetweenDates: number

    if(date1<=today){
      let timeInMilisec: number =  date1.getTime()-today.getTime();
      daysBetweenDates = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
    }
    else{
      let timeInMilisec: number = date1.getTime() - date2.getTime();
      daysBetweenDates = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
    }
    return daysBetweenDates; 
    
  }



  logout(){
    localStorage.clear(); 
    this.router.navigate(['']);
  }
  routerHome(){
    this.router.navigate(['reader']);
  }
  routerProfile(){
    this.router.navigate(['profile']);
  }
  changePassword(){
    this.router.navigate(['changePassword']);
  }
  

}
