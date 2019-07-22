import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {NavController} from "@ionic/angular";
import {FirestoreService} from "../services/firestore.service";
import { ModalController } from "@ionic/angular";
import {AddNewCoursePage} from "../add-new-course/add-new-course.page";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  private userEmail: string
  private courses: any

  constructor(
      private authService: AuthenticationService,
      private navCtrl: NavController,
      private database: FirestoreService,
      private modalCtrl: ModalController
  ) { }

  ngOnInit(){
    if(this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack('');
    }

    this.database.fetchCourseData(this.userEmail).subscribe(data => {
      this.courses = data;
      console.log(data);
    })
  }

  newCourse() {
    this.presentModal()
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: AddNewCoursePage
    })

    return await modal.present();
  }
}
