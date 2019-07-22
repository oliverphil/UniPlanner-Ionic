import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
      private firestore: AngularFirestore
  ) {
  }

  fetchCourseData(user: string) {
    return this.firestore.collection<any>('users/uzoeuFTjeB6UZVUQNkcS/courses', ref =>
      ref.where('email', '==', user)).valueChanges();
  }

  putUser(userEmail: string) {
    let user = this.firestore.doc<any>('users/uzoeuFTjeB6UZVUQNkcS');
    user.set({
      email: userEmail
    }).catch(err => console.log(err));
  }
}
