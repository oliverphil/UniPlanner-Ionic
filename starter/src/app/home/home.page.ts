import { Component } from '@angular/core';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private name: String;

  constructor(public navCtrl: NavController) {
  }

  onUpdate(updateName) {
    this.name = updateName

  }

  onLogin(event) {
    this.navCtrl.navigateForward("/main-page")
  }

}
