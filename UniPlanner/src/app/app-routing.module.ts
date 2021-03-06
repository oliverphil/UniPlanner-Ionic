import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'courses', loadChildren: './course-management/courses/courses.module#CoursesPageModule', canActivate: [AuthGuard] },
  { path: 'classes', loadChildren: './course-management/classes/classes.module#ClassesPageModule', canActivate: [AuthGuard] },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule', canActivate: [AuthGuard] },
  { path: 'add-new-class', loadChildren: './course-management/add-new-class/add-new-class.module#AddNewClassPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
