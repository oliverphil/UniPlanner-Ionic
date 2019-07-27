import { Injectable } from '@angular/core';
import * as firebase from "firebase"
import { userDetails } from "./authentication.service";
import {firestore} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  fetchCourseData() {
    return firebase.firestore().collection(`/users/${userDetails().uid}/courses/`).get()
  }

  addCourse(data) {
    firebase.firestore().collection(`/users/${userDetails().uid}/courses/`).doc(data.code).set(data)
  }

}
