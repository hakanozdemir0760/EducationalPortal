import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Messages } from 'src/app/core/constants/messages';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private authenticationService:AuthenticationService,
    private formBuilder:FormBuilder,
    private toastService: HotToastService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      const {email,password} = Object.assign({},this.loginForm.value);
       this.authenticationService.login({email:email,password:password}).subscribe( () => {
         this.router.navigate(["/panel"])
        this.toastService.success(Messages.SuccessLogin);
      })
    } else {      
      this.toastService.success("Lütfen bilgileri boş geçmeyin");
    }
  }

}
