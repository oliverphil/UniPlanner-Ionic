import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController} from "@ionic/angular";
import {AuthenticationService} from "../services/authentication.service";
import {AppComponent} from "../app.component";
import {FirestoreService} from "../services/firestore.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(

      private navCtrl: NavController,
      private authService: AuthenticationService,
      private formBuilder: FormBuilder,
      private alert: AlertController,
      private appComponent: AppComponent,
      private database: FirestoreService

  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };


  loginUser(value){
    this.authService.loginUser(value)
        .then(res => {
          this.navCtrl.navigateForward('/home');
        }, err => {
          this.errorMessage = err.message;
          this.presentAlert()
        })
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Incorrect Details',
      message: this.errorMessage,
      buttons: [
        {
          text: 'Create Account',
          handler: value => {
            this.navCtrl.navigateForward('/register');
          }
        },
        {
          text: 'Try Again',
          handler: value => {
            this.navCtrl.navigateBack("/login");
          }
        }
      ]
    });

    await alert.present();
  }

  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

}
