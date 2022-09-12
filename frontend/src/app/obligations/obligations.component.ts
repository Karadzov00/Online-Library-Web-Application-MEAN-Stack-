import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
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

          if(!elem.razduzen.localeCompare('ne')){
            // console.log(elem.datum_zaduzivanja);

            let obl: Obligation = elem;  
            this.currObligations.push(obl)
          }

        })
        console.log("trenutna zaduzenja");
        console.log(this.currObligations);
      }
    })

  }

  allObligations: Obligation[]; 
  currObligations:Obligation[]=[]; 
  user: User; 

}
