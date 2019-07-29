import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CoursesPage } from './courses.page';
import {AddNewCoursePage} from "../add-new-course/add-new-course.page";
import {EditCoursePage} from "../edit-course/edit-course.page";

const routes: Routes = [
  {
    path: '',
    component: CoursesPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
  declarations: [CoursesPage, AddNewCoursePage, EditCoursePage],
  entryComponents: [AddNewCoursePage, EditCoursePage],
  exports: [AddNewCoursePage, EditCoursePage]
})
export class CoursesPageModule {}
