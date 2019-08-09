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

  static async fetchClassInfo(courseCode) {
    let classes = []
    await firebase.firestore().collection(`/users/${userDetails().uid}/courses/${courseCode}/classes`).get()
        .then(cls => {
          cls.docs.forEach(doc => {
            classes.push(doc.data())
          })
        })
    return classes
  }

  static async fetchAllClasses() {
    let courses = this.fetchCourseList();
    let courseDocs = await courses.then(result => {
      return result.docs
    })
    let docs = []
    courseDocs.forEach(doc => {
      docs.push(doc.data())
    })
    let classes = []
    for(let course of docs){
      let cls = await this.fetchClassInfo(course.code).then(result => {
        return result
      })
      classes = classes.concat(cls)
    }
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

  static addClass(data) {
    let col = firebase.firestore().collection(`/users/${userDetails().uid}/courses/${data.code}/classes`)
    let startTime = new Date(data.startTime)
    let endTime = new Date(data.endTime)
    data.startTime = (startTime.getHours() * 100) + startTime.getMinutes()
    data.endTime = (endTime.getHours() * 100) + endTime.getMinutes()
    console.log(data)
    col.add(data)
  }

  static editCourse(data) {
    return firebase.firestore().collection(`/users/${userDetails().uid}/courses/`)
        .doc(data.code).set(data).then(res => {return true}, err => {return false});
  }

  static async fetchClassesToday() {
    let allClasses = await this.fetchAllClasses()
    let today = new Date(Date.now())
    let todayClasses = []
    for(let cls of allClasses) {
      if(this.isClassOnDate(cls, today)){
        todayClasses.push(cls)
      }
    }
    return todayClasses;
  }

  static isClassOnDate(cls, date: Date): boolean {
    let dayNum = date.getDay()
    for(let day of cls.day) {
      let thisDayNum
      switch (day){
        case "monday":
          thisDayNum = 1;
          break;
        case "tuesday":
          thisDayNum = 2;
          break;
        case "wednesday":
          thisDayNum = 3;
          break;
        case "thursday":
          thisDayNum = 4;
          break;
        case "friday":
          thisDayNum = 5;
          break;
        case "saturday":
          thisDayNum = 6;
          break;
        default:
          thisDayNum = 7;
      }
      if(thisDayNum === dayNum)
        return true;
    }

    return false;
  }

    static async deleteCourse(code) {
        firebase.firestore().doc(`/users/${userDetails().uid}/courses/${code}`).delete()
    }
}
