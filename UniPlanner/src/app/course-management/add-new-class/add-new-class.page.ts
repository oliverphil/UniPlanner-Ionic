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
    desc: '',
    startTime: '',
    endTime: '',
    days: []
  };

  private days: string[] = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]

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
      desc: '',
      startTime: '',
      endTime: '',
      days: []
    };
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      code: this.event.code,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      desc: this.event.desc,
      days: this.event.days
    }

    this.modalCtrl.dismiss()
  }

  verifySubmit() {
    console.log(this.event)
    return this.event.code !== '' && this.event.endTime !== '' && this.event.startTime !== ''
  }

}
