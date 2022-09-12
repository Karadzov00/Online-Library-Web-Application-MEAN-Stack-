import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getTop3Books(){
    return this.http.get(`${this.uri}/books/getTop3Books`); 
  }

  getAtomicHabits(){
    return this.http.get(`${this.uri}/books/getAtomicHabits`); 
  }

  getRandomBook(){
    return this.http.get(`${this.uri}/books/getRandomBook`); 

  }

  getHighestId(){
    return this.http.get(`${this.uri}/books/getHighestId`); 
  }

  fetchAllBooks(){
    return this.http.get(`${this.uri}/books/fetchAllBooks`); 

  }

  getBookById(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/books/getBookById`, data); 

  }

  checkInsertDate(date){
    const data={
      date:date
    }
    return this.http.post(`${this.uri}/books/checkInsertDate`, data); 

  }

}
