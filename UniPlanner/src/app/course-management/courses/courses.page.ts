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
  private waiting: boolean

  constructor(
      private authService: AuthenticationService,
      private navCtrl: NavController,
      private modalCtrl: ModalController,
      private db: FirestoreService
  ) {

  }

  async ngOnInit(){
    //fetch locally stored course list
    this.courses = this.db.fetchCourseListNow()
    //if there is no locally stored courses, show the spinner
    if(!this.courses || this.courses.length < 1) {
      this.waiting = true
    }

    //fetch the course list from firebase
    await this.db.fetchCourseList().then(data => {
      let courses = []
      if(!data.empty) {
        data.docs.forEach(course => {
          let courseData = course.data()
          courses.push(courseData)
        })
      }
      this.courses = courses
    })
    this.waiting = false
  }

  /**
   * Delete the course.
   * @param code the course code for the course to be deleted
   */
  async deleteCourse(code) {
    await this.db.deleteCourse(code);
    this.ngOnInit();
  }

  /**
   * Open the edit course modal.
   * @param course the course to populate the modal with
   */
  async presentEditCourseModal(course) {
    //setup information for the modal
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
    //refresh courses page when modal is exited
    modal.onDidDismiss().then(resolve => {
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }

  /**
   * Open the new course modal.
   */
  async presentNewCourseModal() {
    //setup information for the modal
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
    //refresh courses page when modal is exited
    modal.onDidDismiss().then(resolve => {
      console.log(resolve.data)
      if(!resolve.data){
        //TODO: Popup to alert user that course already exists.
        console.log("Course exists")
      }
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }
}
