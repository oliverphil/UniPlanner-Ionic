import { Component, OnInit } from '@angular/core';
import { FirestoreService } from "../../services/firestore.service";
import {AddNewCoursePage} from "../add-new-course/add-new-course.page";
import {ModalController} from "@ionic/angular";
import {AddNewClassPage} from "../add-new-class/add-new-class.page";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

  private classes: any[]

  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.classes = FirestoreService.fetchAllClasses()
  }

  convert24to12(time){
    let hr = ((time % 1200) / 100).toString().split(".")[0];
    let min = time.toString().substring(2, 4)
    return `${hr}:${min}${time < 1300 ? 'AM' : 'PM'}`;
  }

  daysToString(days){
    let str = ""
    for(let day of days) {
      if(str.length > 0){
        str = str + ", "
      }
      str = str + (day.toLocaleUpperCase()).substring(0, 3)
    }
    return str;
  }

  newClass() {
    this.presentNewClassModal()
  }

  async presentNewClassModal() {
    let modal = await this.modalCtrl.create({
      component: AddNewClassPage,
      // componentProps: {
      //   "header": "Add a Class",
      //   "button": "Add Class",
      // }
    })
    modal.onDidDismiss().then(resolve => {
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }
}
