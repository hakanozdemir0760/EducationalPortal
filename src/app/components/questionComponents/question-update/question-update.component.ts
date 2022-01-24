import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/app/models/questionModels/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.css']
})
export class QuestionUpdateComponent implements OnInit {

  questionUpdateForm:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Question,
  private formBuilder:FormBuilder,
  private questionService:QuestionService) { }

  ngOnInit(): void {
  }

  createQuestionUpdateForm(){
    
  }

}
