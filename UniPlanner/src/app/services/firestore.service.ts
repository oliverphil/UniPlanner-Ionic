import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  fetchCourseData() {
    console.log("fetch");
  }
}
