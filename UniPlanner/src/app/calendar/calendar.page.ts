import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from "ionic2-calendar/calendar";
import {AlertController} from "@ionic/angular";
import {formatDate} from "@angular/common";
import {FirestoreService} from "../services/firestore.service";

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

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) {}

  async ngOnInit() {
    let classes = await FirestoreService.fetchAllClasses()
    let events = []
    for(let cls of classes){
      for(let day of cls.day){
        let startDate = this.makeDate(cls.startTime, day)
        // startDate.setTime(cls.startTime)
        let endDate = this.makeDate(cls.endTime, day)
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
    this.eventSource = events;
  }

  makeDate(time, day){
    let date = new Date(Date.now())
    let dayNum = this.getDayNum(day)
    let todayNum = date.getDay()
    date.setDate(date.getDate() + (dayNum - todayNum))
    let hour12 = this.convert24to12(time)
    date.setHours(hour12[0], hour12[1], 0)
    return date
  }

  convert24to12(time){
    let hr = time.toString().substring(0, 2);
    let min = time.toString().substring(2, 4)
    return [hr, min]
  }

  getDayNum(day) {
    switch(day) {
      case "monday":
        return 1;
      case "tuesday":
        return 2;
      case "wednesday":
        return 3;
      case "thursday":
        return 4;
      case "friday":
        return 5;
      case "saturday":
        return 6;
      default:
        return 7;
    }
  }

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

// Change between month/week/day
  changeMode(mode) {
    console.log(this.eventSource)
    this.calendar.mode = mode;
  }

// Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

// Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

// Calendar event was clicked
  async onEventSelected(event) {
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
