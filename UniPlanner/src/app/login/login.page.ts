import {Component, OnInit} from '@angular/core';
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
    private alert: AlertController
  ) {
  }

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

  /**
   * Login a user.
   * @param value the information about the user trying to log in
   */
  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        this.navCtrl.navigateForward('/home');
      }, err => {
        this.errorMessage = err.message;
        this.presentAlert()
      })
  }

  /**
   * Show a popup with an error message if the login was unsuccessful.
   */
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

  /**
   * Go to the register page.
   */
  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

}
