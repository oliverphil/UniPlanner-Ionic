import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController, AlertController} from "@ionic/angular";
import {AuthenticationService} from "../services/authentication.service";
import {FirestoreService} from "../services/firestore.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  header: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private database: FirestoreService,
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
      validate: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  /**
   * Register a user.
   * @param value the user's information to register with
   */
  async tryRegister(value) {
    let reg = await this.authService.registerUser(value)
    if (reg) {
      this.errorMessage = "Your account has been created. Please log in.";
      this.successMessage = "";
      this.header = "Registration Successful"
      this.showAlert()
    } else {
      this.successMessage = "";
      this.header = "Registration Unsuccessful"
      this.showAlert()
    }
  }

  /**
   * Pop-up alert to show user if registration was successful
   * or not.
   */
  async showAlert() {
    let buttons = this.header === "Registration Successful" ? [{
      text: 'Go To Login',
      handler: value => {
        this.navCtrl.navigateBack("/login");
      }
    }] : [{
      text: 'Go Back',
      handler: value => {
        this.navCtrl.navigateBack("/register")
      }
    }]
    console.log(buttons)
    const alert = await this.alert.create({
      header: this.header,
      message: this.successMessage,
      buttons: buttons
    });

    await alert.present();
  }

  /**
   * Ensure valid password.
   */
  validatePassword() {
    return this.validations_form.value.password === this.validations_form.value.validate;
  }

  /**
   * Go to the login page.
   */
  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

}
