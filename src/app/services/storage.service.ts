import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, StringFormat, uploadBytesResumable, uploadString } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private baseUrl:string = 'gs://educationalportal-459a1.appspot.com';
  constructor() { 
    
  }

  getAll(){

  }


  async upload(file:File){
    
    const storageRef = ref(getStorage(),this.baseUrl + "/myfile/"+file.name);
    const uploadTask = uploadBytesResumable(storageRef,file);
    const uploadTaskSnapshot = uploadTask.on('state_changed',(snapshot) =>{
      const data = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    })
    return uploadTaskSnapshot;
  }
}
