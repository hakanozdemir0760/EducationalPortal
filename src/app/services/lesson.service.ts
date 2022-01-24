import { Injectable } from '@angular/core';
import { 
  addDoc, collection,
  deleteDoc,
  doc, getDoc, getDocs,
  getFirestore, onSnapshot,
   orderBy, query, updateDoc, where 
} from "firebase/firestore"; 
import { of } from 'rxjs';
import { Lesson } from '../models/lessonModels/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private readonly collectionPath:string = "lessons";
  private lessonCollection = collection(getFirestore(),this.collectionPath);

  constructor() { }

  async getAll(){
    let lessons:Lesson[] = [];
   const collection = await getDocs(this.lessonCollection);
   collection.forEach(responseData=>{
    lessons.push({
      id:responseData.get("id"),
      name:responseData.get("name")
    })
   })
   return of(lessons)
  }

  async add(lesson:Lesson){
    const addOperation = await addDoc(this.lessonCollection, {
      id:lesson.id,
      name: lesson.name,
    });
    return of(addOperation);
  }

  async delete(lesson:Lesson){
    const deleteOperation = await deleteDoc(doc(getFirestore(),this.collectionPath,lesson.id))
    return of(deleteOperation);
  }

 async update(lesson:Lesson){
   const lessonDocRef = doc(getFirestore(), this.collectionPath, lesson.id);
   const updateOperation = await updateDoc(lessonDocRef,{
    name: lesson.name,
   });
   return of(updateOperation);
 }

}
