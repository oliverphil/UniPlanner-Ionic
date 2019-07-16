import { Component } from '@angular/core';
import { NavController } from "@ionic/angular";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private name: String;

  constructor(public router: Router) {
  }

  onUpdate(updateName) {
    this.name = updateName
  }

  onLogin(event) {
    if(!this.name || this.name === "")
      return
    let navigationExtras: NavigationExtras = {
      state: {
        name: this.name
      }
    }
    this.router.navigateByUrl("/main-page", navigationExtras);
  }

}
