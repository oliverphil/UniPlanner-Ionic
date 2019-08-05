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

  static fetchClassInfo(courseCode) {
    return firebase.firestore().collection(`/users/${userDetails().uid}/courses/${courseCode}/classes`).get()
  }

  static fetchAllClasses() {
    let classes = []
    firebase.firestore().collection(`/users/${userDetails().uid}/courses/`).get().then(res => {
      res.docs.forEach(doc => {
        this.fetchClassInfo(doc.id).then(cls => {
          cls.docs.forEach(doc => {
            classes.push(doc.data())
          })
        })
      })
    })
    return classes
  }

  addCourse(data) {
    let col = firebase.firestore().collection(`/users/${userDetails().uid}/courses/`)
    col.doc(data.code).get().then(res => {
      if(!res.exists){
        col.doc(data.code).set(data)
            .then(res => {
              return true;
            }).catch(err => {
              return false;
            })
      } else {
        return false;
      }
    }).catch(err => console.log(err))
  }

  static editCourse(data) {
    return firebase.firestore().collection(`/users/${userDetails().uid}/courses/`)
        .doc(data.code).set(data).then(res => {return true}, err => {return false});
  }

}
