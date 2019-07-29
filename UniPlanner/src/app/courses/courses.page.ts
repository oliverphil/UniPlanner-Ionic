import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {NavController} from "@ionic/angular";
import {FirestoreService} from "../services/firestore.service";
import { ModalController } from "@ionic/angular";
import {AddNewCoursePage} from "../add-new-course/add-new-course.page";
import {EditCoursePage} from "../edit-course/edit-course.page";

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
      private database: FirestoreService,
      private modalCtrl: ModalController,
  ) {

  }

  ngOnInit(){
    this.database.fetchCourseList().then(data => {
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
    this.ngOnInit()
  }

  newCourse() {
    this.presentNewCourseModal()
    this.ngOnInit()
  }

  async presentEditCourseModal(course) {
    let modal = await this.modalCtrl.create({
      component: EditCoursePage,
      componentProps: {
        "courseData": course
      }
    })
    modal.onDidDismiss().then(resolve => {
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }

  async presentNewCourseModal() {
    let modal = await this.modalCtrl.create({
      component: AddNewCoursePage
    })
    modal.onDidDismiss().then(resolve => {
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }
}
