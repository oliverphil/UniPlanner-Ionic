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
    //get locally stored classes
    this.classes = this.db.fetchAllClassesNow()
    //if no locally stored classes, show spinner
    if(!this.classes || this.classes.length < 1){
      this.waiting = true
    }
    //get classes stored in firebase
    new Promise(() => {
      this.db.fetchAllClasses().then(res => {
        this.classes = res;
        this.waiting = false
      })
    })
  }

  /**
   * Show new class modal.
   */
  async presentNewClassModal() {
    //setup modal with information for the new class modal
    let modal = await this.modalCtrl.create({
      component: AddNewClassPage,
      componentProps: {
        "title": "Add a Class",
        "button": "Add Class",
      }
    })
    //refresh classes page on dismiss
    modal.onDidDismiss().then(resolve => {
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }

  /**
   * Show edit class modal.
   * @param cls the class to be edited
   */
  async presentEditClassModal(cls) {
    let clsCopy = {...cls}
    //setup modal with information for the edit class modal
    let modal = await this.modalCtrl.create({
      component: AddNewClassPage,
      componentProps: {
        "cls": clsCopy,
        "title": "Edit Class",
        "button": "Edit",
      }
    })
    //refresh classes page on dismiss
    modal.onDidDismiss().then(resolve => {
      this.ngOnInit()
    }).catch(err => console.log(err))

    return await modal.present();
  }

  /**
   * Delete the class from firebase.
   * @param cls the class to delete
   */
  deleteClass(cls) {
    this.db.deleteClass(cls)
    this.ngOnInit()
  }
}
