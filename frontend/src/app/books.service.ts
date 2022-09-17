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

  getMaxDays(){
    return this.http.get(`${this.uri}/books/getMaxDays`); 

  }

  getBookById(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/books/getBookById`, data); 

  }

  returnBook(id, username, book_id){
    const data={
      id:id,
      username:username,
      book_id:book_id
    }
    return this.http.post(`${this.uri}/books/returnBook`, data); 

  }

  checkInsertDate(date){
    const data={
      date:date
    }
    return this.http.post(`${this.uri}/books/checkInsertDate`, data); 

  }


  searchBooks(name, author){
    const data={
      name:name,
      author:author
    }
    return this.http.post(`${this.uri}/books/searchBooks`, data); 

  }

  advancedSearch(searchObj){
    const data={
      searchObj:searchObj
    }
    return this.http.post(`${this.uri}/books/advancedSearch`, data); 

  }


  makeObligation(obligation){
    const data={
      obligation:obligation
    }
    return this.http.post(`${this.uri}/books/makeObligation`, data); 

  }

  addComment(comment){
    const data={
      comment:comment
    }
    return this.http.post(`${this.uri}/books/addComment`, data); 

  }

  updateBook(book){
    const data={
      book:book
    }
    return this.http.post(`${this.uri}/books/updateBook`, data); 

  }

  addBook(book){
    const data={
      book:book
    }
    return this.http.post(`${this.uri}/books/addBook`, data); 

  }

  acceptSuggestion(suggestion){
    const data={
      suggestion:suggestion
    }
    return this.http.post(`${this.uri}/books/acceptSuggestion`, data); 

  }

  deleteBook(bookId){
    const data={
      bookId:bookId
    }
    return this.http.post(`${this.uri}/books/deleteBook`, data); 

  }

  changeMaxDays(days){
    const data={
      days:days
    }
    return this.http.post(`${this.uri}/books/changeMaxDays`, data); 

  }
  suggestBook(suggestion){
    const data={
      suggestion:suggestion
    }
    return this.http.post(`${this.uri}/books/suggestBook`, data); 

  }

  fetchBookSuggestions(){
    return this.http.get(`${this.uri}/books/fetchBookSuggestions`); 

  }




}
