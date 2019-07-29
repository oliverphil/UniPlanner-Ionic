import { Injectable } from '@angular/core';
import * as firebase from "firebase"
import { userDetails } from "./authentication.service";
import {firestore} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  fetchCourseList() {
    return firebase.firestore().collection(`/users/${userDetails().uid}/courses/`).get()
  }

  fetchCourseInfo(courseCode) {
    return firebase.firestore().collection(`/users/${userDetails().uid}/courses/${courseCode}/classes`).get()
  }

  addCourse(data) {
    firebase.firestore().collection(`/users/${userDetails().uid}/courses/`).doc(data.code).set(data)
  }

}
