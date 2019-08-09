import { Component } from '@angular/core';

import {MenuController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthenticationService, userDetails} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Calendar',
      url: '/calendar',
      icon: 'calendar'
    },
    {
      title: 'Courses',
      url: '/courses',
      icon: 'list'
    },
    {
      title: 'Classes',
      url: '/classes',
      icon: 'book'
    }
  ];

  private checkAuth = userDetails;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeMenu(){
    this.menuCtrl.close()
  }

  logout() {
    AuthenticationService.logout()
    this.navCtrl.navigateForward("/login")
  }

}
