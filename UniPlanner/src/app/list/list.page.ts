import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  private selectedItem: any;

  userEmail: string;

  constructor(
      private navCtrl: NavController,
      private authService: AuthenticationService
  ) {}

}
