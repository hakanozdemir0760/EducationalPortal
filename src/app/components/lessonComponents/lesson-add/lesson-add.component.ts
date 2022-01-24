import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Guid } from 'guid-typescript';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.css']
})
export class LessonAddComponent implements OnInit {

  lessonAddForm:FormGroup;
  constructor(private lessonService:LessonService,
    private formBuilder:FormBuilder,
    private toastService:HotToastService) { }

  ngOnInit(): void {
    this.createLessonAddForm();
  }

  createLessonAddForm(){
    this.lessonAddForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  async add(){
    if (this.lessonAddForm.valid) {
      const {name} = Object.assign({},this.lessonAddForm.value);        
      (await this.lessonService.add({
        id:Guid.create().toString(),
        name:name
      })).subscribe( () =>{
        this.toastService.success("Başarılı bir şekilde eklendi")
      })
    } else {
      
      this.toastService.warning("Lütfen bilgileri boş geçmeyin")
    }
  }
}
