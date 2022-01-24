import { Injectable } from '@angular/core';
import { 
  addDoc, collection,
  deleteDoc,
  doc, getDoc, getDocs,
  getFirestore, onSnapshot,
   orderBy, query, updateDoc, where 
} from "firebase/firestore"; 
import { of } from 'rxjs';
import { LessonTopic } from '../models/lessonTopicModels/lessonTopic';

@Injectable({
  providedIn: 'root'
})
export class LessonTopicService {

  private readonly collectionPath:string = "lessonTopics";
  private lessonTopicCollection = collection(getFirestore(),this.collectionPath);

  constructor() { }

  async getAll(){
    let lessonTopics:LessonTopic[] = [];
   const collection = await getDocs(this.lessonTopicCollection);
   collection.forEach(responseData=>{
    lessonTopics.push({
      id:responseData.get("id"),
      title:responseData.get("title"),
      body:responseData.get("body"),
      lessonId:responseData.get("lessonId"),
      video:responseData.get("video")
    })
   })
   return of(lessonTopics)
  }

  async add(lessonTopic:LessonTopic){
    const addOperation = await addDoc(this.lessonTopicCollection, {
      id:lessonTopic.id,
      title: lessonTopic.title,
      body : lessonTopic.body,
      lessonId: lessonTopic.lessonId,
      video:lessonTopic.video
    });
    return of(addOperation);
  }

  async delete(lessonTopic:LessonTopic){
    const deleteOperation = await deleteDoc(doc(getFirestore(),this.collectionPath,lessonTopic.id))
    return of(deleteOperation);
  }

 async update(lessonTopic:LessonTopic){
   const lessonTopicDocRef = doc(getFirestore(), this.collectionPath, lessonTopic.id);
   const updateOperation = await updateDoc(lessonTopicDocRef,{
    title: lessonTopic.title,
      body : lessonTopic.body,
      lessonId: lessonTopic.lessonId,
      video:lessonTopic.video
   });
   return of(updateOperation);
 }
}
