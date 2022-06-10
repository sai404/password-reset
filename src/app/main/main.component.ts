import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  repPass: string="none";

  displayMsg:string="";
  isAcountCreated:boolean=false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  
  ResetAll(){
    this.register.controls['FirstName'].setValue('');
    this.register.controls['LastName'].setValue('');
    this.register.controls['Email'].setValue('');
    this.register.controls['State'].setValue('');
    this.register.controls['City'].setValue('');
    this.register.controls['Phone'].setValue('');
    this.register.controls['Passwd'].setValue('');
    this.register.controls['rPassword'].setValue('');
  }

  

  register=new FormGroup({
    FirstName:new FormControl('',[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    LastName:new FormControl('',[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    Email:new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    State:new FormControl('',[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    City:new FormControl('',[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*')
    ]),
    Phone:new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    Passwd:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
    rPassword:new FormControl('')
  });
  registerForm(){
    if(this.password.value==this.rpasswd.value){
      console.log("Submitted");
      this.repPass='none';

      this.auth.registerUser([
        this.register.value.FirstName,
        this.register.value.LastName,
        this.register.value.Email,
        this.register.value.Passwd
      ]).subscribe(res=>{
        console.log(res)
        console.log(res)
        if(res=="Success"){
          this.displayMsg='Accound Created Successfully';
          this.isAcountCreated=true;
          this.ResetAll();
        }else if(res=="User Already Exists"){
          this.displayMsg="Account Already Exists";
          this.isAcountCreated=false;
        }else{
          this.displayMsg="Something Went Wrong";
          this.isAcountCreated=false;
        }
        
      })
    }else{
      this.repPass="inline";
    }
  }
  get firstName(): FormControl{
    return this.register.get('FirstName') as FormControl;
  }
  get lastName(): FormControl{
    return this.register.get('LastName') as FormControl;
  }
  get email(): FormControl{
    return this.register.get('Email') as FormControl;
  }
  get state(): FormControl{
    return this.register.get('State') as FormControl;
  }
  get city(): FormControl{
    return this.register.get('City') as FormControl;
  }
  get phone(): FormControl{
    return this.register.get('Phone') as FormControl;
  }
  get password(): FormControl{
    return this.register.get('Passwd') as FormControl;
  }
  get rpasswd(): FormControl{
    return this.register.get('rPassword') as FormControl;
  }
  
}

