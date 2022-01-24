import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LessonService } from 'src/app/services/lesson.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent implements OnInit {

  currentUser$ = this.authenticationService.currentUser$;

  //123456789_trabzon
  constructor(private lessonService:LessonService,
    private storageService:StorageService,
    private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

  // dosya yükleme
  onFileSelected(event:any){
    const file = event.target.files;
    if (file) {
      console.log(file)
      // const formData = new FormData();
      // formData.append("thumbnail",file);
      for (let i = 0; i < file.length; i++) {
        const element = file[i];
        this.upload(element);
      }

    }
  }

  async upload(file:any){
    this.storageService.upload(file);
   
  }
}
