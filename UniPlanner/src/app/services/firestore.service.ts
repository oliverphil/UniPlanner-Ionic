import { Injectable } from '@angular/core';
import * as firebase from "firebase"
import { userDetails } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  static fetchCourseList() {
    return firebase.firestore().collection(`/users/${userDetails().uid}/courses/`).get()
  }

  static fetchCourseInfo(courseCode) {
    return firebase.firestore().collection(`/users/${userDetails().uid}/courses/${courseCode}/classes`).get()
  }

  static addCourse(data) {
    firebase.firestore().collection(`/users/${userDetails().uid}/courses/`).doc(data.code).set(data)
        .then(res => {
      return true;
    }).catch(err => {
      return false;
    })
  }

}
