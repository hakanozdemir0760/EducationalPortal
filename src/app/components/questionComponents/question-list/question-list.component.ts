import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Guid } from 'guid-typescript';
import { UserModel } from 'src/app/models/authenticationModels/userModel';
import { Question } from 'src/app/models/questionModels/question';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ForwardedReplieService } from 'src/app/services/forwarded-replie.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionAddComponent } from '../question-add/question-add.component';
import { QuestionUpdateComponent } from '../question-update/question-update.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions:Question[] = [];
  userModel:UserModel = {id:"",email:"",displayName:""};
  forwardedReplieForm:FormGroup;
  isDataNull:boolean = true;
  
  constructor(private questionService:QuestionService,
    private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    private forwardedReplieService:ForwardedReplieService,    
    private toastService: HotToastService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
    this.createReplieForm();
    this.getUser();
  }

  getUser(){
    this.authenticationService.currentUser$.subscribe( (response) =>{
      this.userModel.id = response.uid;
      this.userModel.email = response.email;
      this.userModel.displayName = response.displayName;
    })
  }
  
  createReplieForm(){
    this.forwardedReplieForm = this.formBuilder.group({      
      answer:["",Validators.required]
    })
  }

  async getAll(){
  (await this.questionService.getAll()).subscribe((response)=>{
    this.questions = response;
    this.isDataNull = false;
  })  
  }

  async forwardedReplieAdd(getQuestionId:string){
    if (this.forwardedReplieForm.valid) {
      const {answer} = Object.assign({},this.forwardedReplieForm.value);
      (await this.forwardedReplieService.add({
        id:Guid.create().toString(),
        answer:answer,
        questionId:getQuestionId,
        userId:this.userModel.id,
        email:this.userModel.email
      })).subscribe( (response) =>{
        this.toastService.success("Cevabınız gönderildi")
      } )
    } else {
      this.toastService.warning("Cevaplama işlemi yapılamdı")
    }
  }

  openQuestionAddDialog(){
    this.dialog.open(QuestionAddComponent,
      {
        width:"500px",
        height:"500px"
      })
  }

  openQuestionUpdateDialog(question:Question){
    this.dialog.open(QuestionUpdateComponent,{
      data:{id:question.id,...question} as Question,
      width:"500px",
        height:"500px"
    })
  }

  async questionDelete(question:Question){
    (await this.questionService.delete(question)).subscribe(()=>{
      this.toastService.show("Başarıyla silindi")
    })
  }
}
