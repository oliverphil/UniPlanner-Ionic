import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service'
import {ModalController, NavController, NavParams} from "@ionic/angular";

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

  private new: boolean;
  private header: string;
  private button: string;

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams) {
    this.info.code = navParams.get("code");
    this.info.details = navParams.get("details");
    this.new = navParams.get("new");
    this.header = navParams.get("header");
    this.button = navParams.get("button");
  }

  handleSubmit() {
    this.modalCtrl.dismiss(FirestoreService.addCourse(this.info))
  }

}
