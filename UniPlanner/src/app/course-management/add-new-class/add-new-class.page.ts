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
    allDay: false
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
      desc: '',
      startTime: '',
      endTime: '',
      allDay: false
    };
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      code: this.event.code,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.resetEvent();
  }

  verifySubmit() {
    return this.event.code !== '' && this.event.endTime !== '' && this.event.startTime !== ''
  }

}
