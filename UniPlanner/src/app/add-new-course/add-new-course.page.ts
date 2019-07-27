import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service'
import {ModalController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.page.html',
  styleUrls: ['./add-new-course.page.scss'],
})
export class AddNewCoursePage {

  private info = {
    code: '',
    details: ''
  }

  constructor(private database: FirestoreService,
              private modalCtrl: ModalController,
              private navCtrl: NavController
  ) {}

  handleSubmit() {
    this.database.addCourse(this.info)
    this.modalCtrl.dismiss()
  }

}
