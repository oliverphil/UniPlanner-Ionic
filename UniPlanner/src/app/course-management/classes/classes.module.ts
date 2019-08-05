import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClassesPage } from './classes.page';
import {AddNewClassPage} from "../add-new-class/add-new-class.page";

const routes: Routes = [
  {
    path: '',
    component: ClassesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClassesPage, AddNewClassPage],
  entryComponents: [AddNewClassPage]
})
export class ClassesPageModule {}
