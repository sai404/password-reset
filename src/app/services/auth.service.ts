import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  currentUser:BehaviorSubject<any>=new BehaviorSubject(null);

  jwtHelperService=new JwtHelperService();

  baseUrl="https://localhost:44341/api/";
  registerUser(user:any){
    // console.log(user[0],user[1],user[2],user[3],user[4],user[5],user[6])
    return this.http.post(this.baseUrl+"User/CreateUser",{
      FirstName:user[0],
      LastName:user[1],
      Email:user[2],
      Password:user[3],
    },{responseType:'text'})
  }
  loginUser(info:any){
    return this.http.post(this.baseUrl + "User/LoginUser",{
      email:info[0],
      password:info[1]
    },{
      responseType:'text'
    });
  }

  setToken(token:string){
    localStorage.setItem("access_token",token)
    this.loadCurrentUser()
  }

  loadCurrentUser(){
    const token=localStorage.getItem("access_token")
    const userInfo=token!=null ?this.jwtHelperService.decodeToken(token) : null;
    console.log(userInfo)
  }

  isLoggedIn():boolean{
    return localStorage.getItem("access_token")?true :false;
    
  }
  removeToken(){
    localStorage.removeItem("access_token");
  }
  forgotPassword(info:any){
    return this.http.post(this.baseUrl + "User/forgot-password",{
      email:info[0],
      password:info[1]
    },{
      responseType:'text'
    });
  }
  resetPassword(info:any){
    return this.http.post(this.baseUrl+"User/Reset",{
      email:info[0],
      password:info[1]
    },{
      responseType:'text'
    })
  }
}
