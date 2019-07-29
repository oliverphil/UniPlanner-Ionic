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

  constructor(private modalCtrl: ModalController) {}

  handleSubmit() {
    this.modalCtrl.dismiss(FirestoreService.addCourse(this.info))
  }

}
