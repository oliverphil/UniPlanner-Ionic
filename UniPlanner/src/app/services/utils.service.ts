import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static convert24to12(time){
    let hr = ((time % 1200) / 100).toString().split(".")[0];
    let min = time.toString().substring(2, 4)
    return `${hr}:${min}${time < 1300 ? 'AM' : 'PM'}`;
  }

  static daysToString(days){
    let str = ""
    for(let day of days) {
      if(str.length > 0){
        str = str + ", "
      }
      str = str + (day.toLocaleUpperCase()).substring(0, 3)
    }
    return str;
  }
}
