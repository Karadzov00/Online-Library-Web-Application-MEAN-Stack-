import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  register(username, password, firstname, lastname, type, address, phone, email, status, image){
    const data={
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      type:type,
      address: address,
      phone: phone,
      email: email,
      status: status, 
      image: image
    }
    return this.http.post(`${this.uri}/users/register`, data)

  }


  checkPassword(password: String):boolean{
    
    return false; 
  }


  public uploadImage(image: File) {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post('/api/v1/image-upload', formData);
  }

}
