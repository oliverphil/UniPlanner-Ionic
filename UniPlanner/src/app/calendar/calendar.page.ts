import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from "ionic2-calendar/calendar";
import {AlertController} from "@ionic/angular";
import {formatDate} from "@angular/common";
import {FirestoreService} from "../services/firestore.service";
import {UtilsService} from "../services/utils.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'week',
    currentDate: new Date(),
  };

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  private waiting: boolean

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController,
              @Inject(LOCALE_ID) private locale: string,
              private db: FirestoreService) {
  }

  async ngOnInit() {
    this.eventSource = this.classesToEvents(this.db.fetchAllClassesNow())
    if(!this.eventSource || this.eventSource.length < 1) {
      this.waiting = true;
    }
    this.refreshCalendar().then(res => {this.waiting = false})
  }

  async refreshCalendar() {
    let classes = await this.db.fetchAllClasses()
    this.eventSource = this.classesToEvents(classes);
  }

  classesToEvents(classes) {
    let events = []
    for(let cls of classes){
      for(let day of cls.day){
        let startDate = UtilsService.makeDate(cls.startTime, day)
        // startDate.setTime(cls.startTime)
        let endDate = UtilsService.makeDate(cls.endTime, day)
        // endDate.setTime(cls.endTime)
        events.push({
          title: cls.code,
          desc: cls.type,
          startTime: startDate,
          endTime: endDate,
          allDay: false
        })
      }
    }
    return events
  }

// Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

// Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

// Calendar event was clicked
  async onEventSelected(event) {
    console.log(this.eventSource)
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

// Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
}
