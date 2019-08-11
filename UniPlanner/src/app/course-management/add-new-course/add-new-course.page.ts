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
              private navParams: NavParams,
              private db: FirestoreService) {
    this.info.code = navParams.get("code");
    this.info.details = navParams.get("details");
    this.new = navParams.get("new");
    this.header = navParams.get("header");
    this.button = navParams.get("button");
  }

  /**
   * Store the edited/new course in firebase.
   */
  async handleSubmit() {
    if(this.new) {
      let res = await this.db.addCourse(this.info).then(re => {
        console.log(re)
        return re
      })
      console.log(res)
      this.modalCtrl.dismiss(res)
    }else{
      this.modalCtrl.dismiss(FirestoreService.editCourse(this.info))
    }
  }

}
