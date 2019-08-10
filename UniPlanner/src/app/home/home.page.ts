import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {AuthenticationService} from "../services/authentication.service";
import {FirestoreService} from "../services/firestore.service";
import {UtilsService} from "../services/utils.service"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private classes: any[]
  private tasks: any[]
  private convert24to12 = UtilsService.convert24to12
  private waiting: boolean

  constructor(
      private navCtrl: NavController,
      private authService: AuthenticationService
  ) { }

  async ngOnInit() {
    this.waiting = true;
    this.classes = await FirestoreService.fetchClassesToday()
    this.waiting = false
  }

}
