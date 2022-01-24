import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LessonTopic } from 'src/app/models/lessonTopicModels/lessonTopic';
import { LessonTopicService } from 'src/app/services/lesson-topic.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  data:any;
  lessonTopics:LessonTopic[] = [];
  constructor(private activatedRoute:ActivatedRoute,
    private lessonTopicService:LessonTopicService) { }

  ngOnInit(): void {
    this.activatedRouteParam();
    console.log(this.data)
  }
  activatedRouteParam(){
    this.activatedRoute.params.subscribe((responseParams)=>{
      if (responseParams["lessonid"]) {
        this.getLessonTopicAll();  
        this.data = responseParams["lessonid"];   
      }
    })
  }

  async getLessonTopicAll(){
      (await this.lessonTopicService.getAll()).subscribe((response)=>{
        this.lessonTopics = response;
      })
  }

}
