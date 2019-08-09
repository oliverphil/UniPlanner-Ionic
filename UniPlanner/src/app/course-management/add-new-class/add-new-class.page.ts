import { Component, OnInit } from '@angular/core';
import { FirestoreService } from "../../services/firestore.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-add-new-class',
  templateUrl: './add-new-class.page.html',
  styleUrls: ['./add-new-class.page.scss'],
})
export class AddNewClassPage implements OnInit {

  event = {
    code: '',
    type: '',
    startTime: '',
    endTime: '',
    day: []
  };

  private courses: any[]

  minDate = new Date().toISOString();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    let courses = []
    FirestoreService.fetchCourseList().then(data => {
      for(let doc of data.docs)
        courses.push(doc.data())
    })
    this.courses = courses;
  }

  resetEvent() {
    this.event = {
      code: '',
      type: '',
      startTime: '',
      endTime: '',
      day: []
    };
  }

  // Create the right event format and reload source
  addEvent() {
    FirestoreService.addClass(this.event)
    this.modalCtrl.dismiss()
  }

  verifySubmit() {
    return this.event.code !== '' && this.event.endTime !== '' && this.event.startTime !== ''
  }

}
