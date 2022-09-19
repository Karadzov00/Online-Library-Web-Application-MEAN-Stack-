import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { BooksService } from '../books.service';
import { Book } from '../model/book';
import { BookHistoryObligation } from '../model/bookHistoryObligation';
import { BookObligation } from '../model/bookObligation';
import { Obligation } from '../model/obligation';
import { User } from '../model/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private router:Router, private userService:UserService,
    private booksService: BooksService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    
    this.userService.getObligations(this.user.kor_ime).subscribe((obligs:Obligation[])=>{
      this.allObligations=obligs; 
      console.log("sva zaduzenja");
      console.log(this.allObligations)
      if(this.allObligations){
        let ctr =0; 
        let not_returned=0;

        this.allObligations.forEach(elem=>{
          if(elem.razduzen.localeCompare('ne')){
            not_returned++; 
          }
        })

        this.allObligations.forEach(elem=>{
          

          if(elem.razduzen.localeCompare('ne')){

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

              this.genres.push(book.zanr); 
              console.log(this.genres); 
  
              let returnDate = new Date(elem.razduzen);
              var oldDate = new Date();
              oldDate.setMonth(oldDate.getMonth() - 12);
              console.log(returnDate);
              console.log(oldDate); 

              var count={};
              this.genres.forEach(function(i) { count[i] = (count[i]||0) + 1;});
              console.log("count"); 
              console.log(count);
              
              this.countData=count; 
             
              
              
              console.log(this.genreData)
              console.log(this.saleData)

              ctr++;
              console.log("ctr je"+ctr)
              
              if(returnDate>=oldDate){
                let month = returnDate.getMonth()+1; 
                console.log(month); 
                this.months.push(month);
                // console.log(this.months); 
                console.log(this.monthsHabits[month]); 
                this.monthsHabits[month].value=this.monthsHabits[month].value+1; 
              }
              
              if(not_returned===ctr){
                console.log("finished");
                this.dataAvailable=true; 

                Object.entries(this.countData).map(([k,v]) => {

                  if (typeof v === 'number'){
                    this.genreHabits.push(
                      { "name": k, "value": v }
                    )
                  }

                });
                // console.log(this.genreHabits);
              }
            })    
          }
        },
        ()=>{
          console.log("finished for each")
        })

        
      }

    },
    (err)=>{console.error(err)},
    ()=>{
      console.log("observable complete")
    })
    

  }

  displayGraphs(){
    console.log("display graphs")
    console.log(this.genreHabits)
  }

  user:User; 
  dataAvailable:boolean; 
  
  countData:any={};
  
  genreHabits=[

  ];

  monthsHabits=[
    {
      "name": "januar",
      "value": 0
    },
    {
      "name": "februar",
      "value": 0
    },
    {
      "name": "mart",
      "value": 0
    },
    {
      "name": "april",
      "value": 0
    },
    {
      "name": "maj",
      "value": 0
    },
    {
      "name": "jun",
      "value": 0
    },
    {
      "name": "jul",
      "value": 0
    },
    {
      "name": "avgust",
      "value": 0
    },
    {
      "name": "septembar",
      "value": 0
    },
    {
      "name": "oktobar",
      "value": 0
    },
    {
      "name": "novembar",
      "value": 0
    },
    {
      "name": "decembar",
      "value": 0
    }
  ];

  mapped = Object.entries(this.countData).map(([k,v]) => {

    this.genreData.push(
      { name: k, value: v }
    )
  
  });

  allObligations: Obligation[]; 
  currObligations:Obligation[]=[]; 

  allBooks:Book[]=[]; 
  currBooks:Book[]=[]; 
  bookObligations:BookObligation[]=[]; 
  historyBookObligations:BookHistoryObligation[]=[]; 

  deadlinePassed:boolean; 
  haveObligations:boolean; 

  jan:number;
  feb:number;
  mar:number;
  apr:number;
  jun:number;
  jul:number;
  avg:number;
  sep:number;
  oct:number;
  nov:number;
  dec:number;

  months:number[]=[]; 
  genres:string[]=[]; 

  genreData:object[]=[]; 

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 },
    { name: "PC", value: 25000 },
  ];
 
  data=[]; 

  on_init(){
    
  }

  updateInfo(){
    this.router.navigate(['updateUser']);

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
