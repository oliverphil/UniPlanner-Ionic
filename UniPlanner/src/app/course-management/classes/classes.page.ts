import { Component, OnInit } from '@angular/core';
import { FirestoreService } from "../../services/firestore.service";
import {AddNewCoursePage} from "../add-new-course/add-new-course.page";
import {ModalController} from "@ionic/angular";
import {AddNewClassPage} from "../add-new-class/add-new-class.page";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

  private classes: any[]
  private daysToString = UtilsService.daysToString
  private convert24to12 = UtilsService.convert24to12
  private waiting: boolean = false

  constructor(
      private modalCtrl: ModalController,
      private db: FirestoreService
  ) {

  }

  async ngOnInit() {
    this.classes = this.db.fetchAllClassesNow()
    if(!this.classes || this.classes.length < 1){
      this.waiting = true
    }
    new Promise(() => {
      this.db.fetchAllClasses().then(res => {
        this.classes = res;
        this.waiting = false
      })
    })
  }

  newClass() {
    this.presentNewClassModal()
  }

  async presentNewClassModal() {
    let modal = await this.modalCtrl.create({
      component: AddNewClassPage,
      componentProps: {
        "title": "Add a Class",
        "button": "Add Class",
      }
    })
    modal.onDidDismiss().then(resolve => {
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }

  async presentEditClassModal(cls) {
    let clsCopy = {...cls}
    let modal = await this.modalCtrl.create({
      component: AddNewClassPage,
      componentProps: {
        "cls": clsCopy,
        "title": "Edit Class",
        "button": "Edit",
      }
    })
    modal.onDidDismiss().then(resolve => {
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }

  editClass(cls) {
    this.presentEditClassModal(cls)
  }

  deleteClass(cls) {
    this.db.deleteClass(cls)
    this.ngOnInit()
  }
}
