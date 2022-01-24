import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Guid } from 'guid-typescript';
import { Lesson } from 'src/app/models/lessonModels/lesson';
import { LessonTopicService } from 'src/app/services/lesson-topic.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson-topic-add',
  templateUrl: './lesson-topic-add.component.html',
  styleUrls: ['./lesson-topic-add.component.css']
})
export class LessonTopicAddComponent implements OnInit {

  lessonTopicForm:FormGroup;
  lessons:Lesson[] = [];
  constructor(private lessonTopicService:LessonTopicService,
    private formBuilder:FormBuilder,
    private toastService:HotToastService,
    private lessonService:LessonService) { }

  ngOnInit(): void {
    this.createLessonTopicForm();
    this.getLessonAll();
  }

  async getLessonAll(){
    (await this.lessonService.getAll()).subscribe((response)=>{
      this.lessons = response;
    })
  }

  createLessonTopicForm(){
    this.lessonTopicForm = this.formBuilder.group({
      title:['',Validators.required],
      lessonId:['',Validators.required],
      body:['',Validators.required],
      video:['',Validators.required],
    })
  }

  async add(){
    if (this.lessonTopicForm.valid) {
      const {lessonId,body,video,title} = Object.assign({},this.lessonTopicForm.value);
      (await this.lessonTopicService.add({
         id:Guid.create().toString(),
         title:title,
         body:body,
         lessonId:lessonId,
         video:video
      })).subscribe((response)=>{
        this.toastService.success("Başarıyla eklendi")
      })
    } else {
      this.toastService.warning("lütfen bilgileri tam doldurunuz")      
    }
  }
}
