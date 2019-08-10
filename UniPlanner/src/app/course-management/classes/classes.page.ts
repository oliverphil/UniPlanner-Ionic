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

  constructor(private modalCtrl: ModalController) {

  }

  async ngOnInit() {
    this.waiting = true
    this.classes = await FirestoreService.fetchAllClasses().then(res => {
      return res
    })
    this.waiting = false
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
    FirestoreService.deleteClass(cls)
    this.ngOnInit()
  }
}
