import { Injectable } from '@angular/core';
import { 
  addDoc, collection,
  deleteDoc,
  doc, getDoc, getDocs,
  getFirestore, onSnapshot,
   orderBy, query, updateDoc, where 
} from "firebase/firestore"; 
import { of } from 'rxjs';
import { Question } from '../models/questionModels/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly collectionPath:string = "questions";
  private questionCollection = collection(getFirestore(),this.collectionPath);
  private readonly questionTitleField = "title";

  constructor() { }

  
  async getByQuestionTitle(questionTitle:string){
    let questions:Question[] = [];
    const getQuery = query(this.questionCollection,where(this.questionTitleField,"==",questionTitle));
    const querySnapshot =  (await getDocs(getQuery));      
    return of(questions);
  }

  async getAll(){
    let questions:Question[] = [];
    const getQuestions = await getDocs(this.questionCollection);
    getQuestions.forEach((responseData)=>{
      questions.push({
        id:responseData.get("id"),
        body:responseData.get("body"),
        lessonId:responseData.get("lessonId"),
        options:responseData.get("options"),        
        title:responseData.get("title")
      })
    })
    return of(questions);
  }

  
  async add(question:Question){
    const addOperation = await addDoc(this.questionCollection, {
      id:question.id,
      title: question.title,
      body: question.body,
      options:question.options,
      lessonId:question.lessonId
    });
    return of(addOperation);
  }

   async delete(question:Question){
     const deleteOperation = await deleteDoc(doc(getFirestore(),this.collectionPath,question.id))
     return of(deleteOperation);
   }

  async update(question:Question){
    const questionDocRef = doc(getFirestore(), this.collectionPath, question.id == null ? question.title : question.id);
    const updateOperation = await updateDoc(questionDocRef,{
      title: question.title,
      body: question.body,
      options:question.options,
      lessonId:question.lessonId
    });
    return of(updateOperation);
  }
}
