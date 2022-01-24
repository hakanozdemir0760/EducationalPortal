import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Guid } from 'guid-typescript';
import { Lesson } from 'src/app/models/lessonModels/lesson';
import { Question } from 'src/app/models/questionModels/question';
import { LessonService } from 'src/app/services/lesson.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {


    questionAddForm:FormGroup;

    optionsCount:number[] = [
      1,2,3,4
    ];
  
    lessons: Lesson[] = [];
  
    inputOptionNameOne:string;
    inputOptionValueOne:string;
    
    inputOptionNameTwo:string;
    inputOptionValueTwo:string;
    
    inputOptionNameThree:string;
    inputOptionValueThree:string;
  
    inputOptionNameFour:string;
    inputOptionValueFour:string;
  
    inputOptionNameFive:string;
    inputOptionValueFive:string;
  
    constructor(private formBuilder:FormBuilder,
      private questionService:QuestionService,
      private toastService:HotToastService,
      private lessonService:LessonService) { }
  
    ngOnInit(): void {
      this.createQuestionAddForm();
      this.getLessonAll();
    }
  
  
    createQuestionAddForm(){
      this.questionAddForm = this.formBuilder.group({
        title:["",Validators.required],
        body:["",Validators.required],
        lessonId:["",Validators.required]
      })
    }
  
    async getLessonAll(){
      (await this.lessonService.getAll()).subscribe((response)=>{
        this.lessons = response;
      })
    }
  
    async add(){
      if (this.questionAddForm.valid) {
        const {title,body,lessonId} = Object.assign({},this.questionAddForm.value);
        (await this.questionService.add(
          {
            id:Guid.create().toString(),
            title:title,
            body:body,
            lessonId:lessonId,
            options:[
              this.inputOptionValueOne,
              this.inputOptionValueTwo,
              this.inputOptionValueThree,
              this.inputOptionValueFour,
              this.inputOptionValueFive
            ]
          }
        )).subscribe((response)=>{
          this.toastService.success("Soru başarıyla eklendi" + lessonId)
          
        })
      } else {
        this.toastService.error("Lütfen bilgileri boş geçmeyin")
      }
    }

}
