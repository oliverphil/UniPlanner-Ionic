import { Component } from '@angular/core';
import {NavController} from "@ionic/angular";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userEmail: string;

  constructor(
      private navCtrl: NavController,
      private authService: AuthenticationService
  ) {}

  ngOnInit(){

    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }
  }

}
