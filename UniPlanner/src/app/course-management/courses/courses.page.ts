import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {NavController} from "@ionic/angular";
import {FirestoreService} from "../../services/firestore.service";
import { ModalController } from "@ionic/angular";
import {AddNewCoursePage} from "../add-new-course/add-new-course.page";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  private courses: any[]

  constructor(
      private authService: AuthenticationService,
      private navCtrl: NavController,
      private modalCtrl: ModalController,
  ) {

  }

  ngOnInit(){
    FirestoreService.fetchCourseList().then(data => {
      let courses = []
      if(!data.empty) {
        data.docs.forEach(course => {
          let courseData = course.data()
          courses.push(courseData)
        })
      }
      this.courses = courses
    })
  }

  onClick(course){
    this.presentEditCourseModal(course)
    // this.ngOnInit()
  }

  newCourse() {
    this.presentNewCourseModal()
    // this.ngOnInit()
  }

  async deleteCourse(code) {
    await FirestoreService.deleteCourse(code);
    this.ngOnInit();
  }

  async presentEditCourseModal(course) {
    let modal = await this.modalCtrl.create({
      component: AddNewCoursePage,
      componentProps: {
        "header": "Edit Course",
        "new": false,
        "button": "Edit",
        "code": course.code,
        "details": course.details,
      }
    })
    modal.onDidDismiss().then(resolve => {
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }

  async presentNewCourseModal() {
    let modal = await this.modalCtrl.create({
      component: AddNewCoursePage,
      componentProps: {
        "header": "Add a Course",
        "new": false,
        "button": "Add Course",
        "code": "",
        "details": "",
      }
    })
    modal.onDidDismiss().then(resolve => {
      console.log(resolve)
      if(!resolve.data){
        //TODO: Popup to alert user that course already exists.
        console.log("Course exists")
      }
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }
}
