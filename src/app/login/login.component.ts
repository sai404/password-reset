import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService ,private router:Router) { }

  ngOnInit(): void {
  }
  
  enterThePassword:boolean=false;
  enableButton:boolean=false;
  enableCheckAccount:boolean=true;
  
  ResetAll(){
    this.enterThePassword=false;
    this.enableCheckAccount=true;
    this.enableButton=false;
    this.login.controls['email'].setValue('');
    this.login.controls['passwd'].setValue('');
  }
  forgotCred=new FormGroup({
    email:new FormControl('',[
      Validators.required,
      Validators.email]),
    passwd:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ])
  });
  login=new FormGroup({
    email:new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    passwd:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ])
  });
  forgotRequest(){
    // console.log(this.forgotCred.value.email)
    this.auth.forgotPassword([this.forgotCred.value.email]).subscribe(res=>{
      if(res=="Found"){
        this.enterThePassword=true;
        this.enableButton=true;
        this.enableCheckAccount=false;
      }
    })
  }
  ResetPassword(){
    this.auth.resetPassword([this.forgotCred.value.email,this.forgotCred.value.passwd]).subscribe(result=>{
      console.log(result);
          if(result=="done"){
            this.ResetAll();
            alert("Password Resetted");
          }else{
            console.log(result);
          }
        })
        let canc=document.getElementById("cancel");
        canc?.click()
  }
  isUserValid=false;
  loginSubmit(){
    // console.log(this.login.value.email,this.login.value.passwd);
    this.auth.loginUser([this.login.value.email,this.login.value.passwd]).subscribe(res=>{
      console.log(res)
      if(res=="Failure"){
        this.isUserValid=false;
        console.log(res)
        // this.ResetAll()
        alert("Invalid Email or Password")
      }else{
        this.isUserValid=true;
        this.auth.setToken(res)
        this.ResetAll()
        this.router.navigateByUrl('home')
      }
    })
  }


  get Email():FormControl{
    return this.login.get('email') as FormControl
  }
  get Password():FormControl{
    return this.login.get('passwd') as FormControl
  }
  
}

