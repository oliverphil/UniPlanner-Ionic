import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage {
  private user: String;

  constructor(router: Router, public alert: AlertController) {
    this.user = router.getCurrentNavigation().extras.state.name;

    this.showPopup()
  }

  async showPopup() {

    let welcomeString = "Welcome " + this.user + "!!";

    const alert = await this.alert.create({
      header: 'Welcome',
      message: welcomeString,
      buttons: ['OK']
    });

    await alert.present();
  }


}
