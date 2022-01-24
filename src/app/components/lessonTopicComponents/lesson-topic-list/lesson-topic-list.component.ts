import { Component, OnInit } from '@angular/core';
import { LessonTopic } from 'src/app/models/lessonTopicModels/lessonTopic';
import { LessonTopicService } from 'src/app/services/lesson-topic.service';

@Component({
  selector: 'app-lesson-topic-list',
  templateUrl: './lesson-topic-list.component.html',
  styleUrls: ['./lesson-topic-list.component.css']
})
export class LessonTopicListComponent implements OnInit {

  lessonTopics: LessonTopic[] = [];
  isDataNull:boolean = true;
  constructor(private lessonTopicService:LessonTopicService) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(){
    (await this.lessonTopicService.getAll()).subscribe((response)=>{
      this.lessonTopics = response;
      this.isDataNull = false;
    })
  }
}
