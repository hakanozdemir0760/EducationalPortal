import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit {

  user$ = this.authenticationService.currentUser$;
  constructor(private authenticationService:AuthenticationService,
    private router:Router,    
    private toastService: HotToastService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(["account/login"]);
      this.toastService.warning("Çıkış yapılıyor")
    })
  }
}
