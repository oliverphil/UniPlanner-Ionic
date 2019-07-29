import {Component, Input, OnInit} from '@angular/core';
import {NavParams} from "@ionic/angular";
import {FirestoreService} from "../services/firestore.service";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.page.html',
  styleUrls: ['./edit-course.page.scss'],
})
export class EditCoursePage implements OnInit {

  private courseData: any
  private classTimes: object

  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.courseData = this.navParams.get("courseData")
    FirestoreService.fetchCourseInfo(this.courseData.code)
    console.log(this.courseData)
  }

}
