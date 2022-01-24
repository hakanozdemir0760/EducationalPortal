import { Injectable } from '@angular/core';
import { 
  addDoc, collection,
  deleteDoc,
  doc, getDoc, getDocs,
  getFirestore, onSnapshot,
   orderBy, query, updateDoc, where 
} from "firebase/firestore"; 
import { of } from 'rxjs';
import { ForwardedReplie } from '../models/forwardedReplieModels/forwardedReplie';

@Injectable({
  providedIn: 'root'
})
export class ForwardedReplieService {

  private readonly collectionPath:string = "forwardedReplies";
  private forwardedRepliesCollection = collection(getFirestore(),this.collectionPath);

  constructor() { }

  async getAll(){
    let forwardedReplies:ForwardedReplie[] = [];
    const getForwardedReplies = await getDocs(this.forwardedRepliesCollection);
    getForwardedReplies.forEach(responseData=>{
      forwardedReplies.push({
        id:responseData.get("id"),
        email:responseData.get("email"),
        answer:responseData.get("answer"),
        questionId:responseData.get("questionId"),
        userId:responseData.get("userId")
      })
    })
    return of(forwardedReplies);
  }

  
  async add(forwardedReplie:ForwardedReplie){
    const addOperation = await addDoc(this.forwardedRepliesCollection, {
      id:forwardedReplie.id,
      questionId: forwardedReplie.questionId,
      userId:forwardedReplie.userId,
      email:forwardedReplie.email,
      answer:forwardedReplie.answer,
    });
    return of(addOperation);
  }

  async delete(forwardedReplie:ForwardedReplie){
    const deleteOperation = await deleteDoc(doc(getFirestore(),this.collectionPath,forwardedReplie.id))
    return of(deleteOperation);
  }

  async update(forwardedReplie:ForwardedReplie){
    const questionDocRef = doc(getFirestore(), this.collectionPath, forwardedReplie.id);
    const updateOperation = await updateDoc(questionDocRef,{
      questionId: forwardedReplie.questionId,
      userId:forwardedReplie.userId,
      email:forwardedReplie.email,
      answer:forwardedReplie.answer,
    });
    return of(updateOperation);
  }
}
