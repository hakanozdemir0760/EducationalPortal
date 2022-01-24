import { Pipe, PipeTransform } from '@angular/core';
import { Lesson } from '../models/lessonModels/lesson';
import { LessonTopic } from '../models/lessonTopicModels/lessonTopic';

@Pipe({
  name: 'lessonFilter'
})
export class LessonFilterPipe implements PipeTransform {

  transform(value: LessonTopic[], filterValue:string): LessonTopic[] {
    filterValue = filterValue ? filterValue.toLocaleLowerCase() : ""
    return filterValue ? value.filter((lessonTopic:LessonTopic) =>
    lessonTopic.lessonId.toLocaleLowerCase().indexOf(filterValue) !== -1):value;
  }
}
