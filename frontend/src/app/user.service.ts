import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'


  login(username, password, type){
    //TODO proveri podatke koriscenjem regexa 
    const data={
      username: username,
      password: password,
      type: type
    }
    return this.http.post(`${this.uri}/users/login`, data);
  }

  /* 
  username: string; 
  password: string; 
  firstname:string; 
  lastname:string; 
  address:string; 
  phone:string; 
  email:string; 
  image:string; 
  type:string;
   */
  register(username, password, firstname, lastname, address, phone, email, image, type){
    const data={
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phone: phone,
      email: email,
      image: image,
      type:type
    }
    return this.http.post(`${this.uri}/users/register`, data)

  }
}
