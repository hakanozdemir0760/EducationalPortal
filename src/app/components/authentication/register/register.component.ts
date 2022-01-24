import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Messages } from 'src/app/core/constants/messages';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    private toastService: HotToastService,
    private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  register(){
    if (this.registerForm.valid) {
      const registerFormValue = Object.assign({},this.registerForm.value);
      this.authenticationService.register(registerFormValue).subscribe((response) => {
        this.router.navigate(['/panel']);
        this.toastService.success(Messages.SuccessRegister);
      })
    } else {
      this.toastService.error("Hata oluştu lütfen bilgilerinizi kontrol edin.")
    }
  }
}
