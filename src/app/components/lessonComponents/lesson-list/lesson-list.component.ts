import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/lessonModels/lesson';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {

  lessons: Lesson[]  = [];
  isDataNull:boolean = true;
  constructor(private lessonService:LessonService) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(){
    (await this.lessonService.getAll()).subscribe((response)=>{
      this.lessons = response;
      this.isDataNull = false;
    })
  }
}
