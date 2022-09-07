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
    let upper = false;     
    let lower = false;     
    let digits = false;
    if(password.length<6){
      return false;
    }
    for (let i = 0; i< password.length; i++) {
      let character = password.charAt(i); 
      if(/[a-z]/.test(character)){
        lower=true; 
      }
      else if(/[A-Z]/.test(character)){
        upper=true; 
      }
      else if(/[0-9]/.test(character)){
        digits=true; 
      }

    }
    if(upper && lower && digits){
      return true; 
    }
    return false; 
    
  }

  checkMobileNumber(phone: String):boolean{
    for (let i = 0; i< phone.length; i++) {
      let character = phone.charAt(i); 
      if(!(/[0-9]/.test(character))){
        return false;  
      }
    }
    return true; 
  }

  checkEmail(email:String):boolean{
    let mail:string = email.valueOf();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return true; 
    }
    return false; 
  }

  findUser(username:String){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/findUser`, data)

  }


  public uploadImage(image: File) {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post('/api/v1/image-upload', formData);
  }

}
