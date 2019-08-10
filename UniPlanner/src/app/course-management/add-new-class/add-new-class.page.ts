import { Component, OnInit } from '@angular/core';
import { FirestoreService } from "../../services/firestore.service";
import {ModalController, NavParams} from "@ionic/angular";
import {UtilsService} from "../../services/utils.service";

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
    day: [],
    room: ''
  };

  private courses: any[]
  private title: string
  private button: string
  private edit: boolean = false

  minDate = new Date().toISOString();

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private db: FirestoreService
  ) {
    this.title = navParams.get('title')
    this.button = navParams.get('button')
    let cls = this.navParams.get('cls')
    if(cls){
      this.event = cls
      this.event.startTime = UtilsService.makeDate(this.event.startTime, 0).toString()
      this.event.endTime = UtilsService.makeDate(this.event.endTime, 0).toString()
      this.edit = true;
    }
    console.log(this.event)
  }

  ngOnInit() {
    let courses = []
    this.db.fetchCourseList().then(data => {
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
      day: [],
      room: ''
    };
  }

  // Create the right event format and reload source
  addEvent() {
    if(this.edit){
      FirestoreService.editClass(this.event)
    } else {
      this.db.addClass(this.event)
      this.modalCtrl.dismiss()
    }
  }

  verifySubmit() {
    return this.event.code !== '' && this.event.endTime !== '' && this.event.startTime !== ''
  }

}
