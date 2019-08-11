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
    //update events for calendar
    this.eventSource = this.classesToEvents(this.db.fetchAllClassesNow())

    //if there are no events, display the spinner while waiting for firestore
    if (!this.eventSource || this.eventSource.length < 1) {
      this.waiting = true;
    }
    //get data from firestore
    this.refreshCalendar().then(res => {
      this.waiting = false
    })
  }

  /**
   * Update the class events for the calendar with
   * data from firestore.
   */
  async refreshCalendar() {
    let classes = await this.db.fetchAllClasses()
    this.eventSource = this.classesToEvents(classes);
  }

  /**
   * Convert classes from firestore to the
   * correct layout for the calendar.
   * @param classes the classes from the database.
   * @return class events for the calendar.
   */
  classesToEvents(classes) {
    let events = []
    for (let cls of classes) {
      //for each day the class is on
      for (let day of cls.day) {
        //convert dates to dates for the week
        let startDate = UtilsService.makeDate(cls.startTime, day)
        let endDate = UtilsService.makeDate(cls.endTime, day)
        //add event to events
        events.push({
          title: cls.code,
          desc: `${cls.type}: ${cls.room}`,
          startTime: startDate,
          endTime: endDate,
          allDay: false
        })
      }
    }
    return events
  }

  /**
   * Change between week/day
   */
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  /**
   * Selected date range and hence title changed
   */
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  /**
   * Calendar event was clicked
   */
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    //show popup with event/class details
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }
}
