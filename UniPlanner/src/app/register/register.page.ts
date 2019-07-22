import { Component, OnInit } from '@angular/core';
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

    validation_messages = {
        'email': [
            { type: 'required', message: 'Email is required.' },
            { type: 'pattern', message: 'Enter a valid email.' }
        ],
        'password': [
            { type: 'required', message: 'Password is required.' },
            { type: 'minlength', message: 'Password must be at least 5 characters long.' }
        ]
    };

    constructor(
        private navCtrl: NavController,
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private database: FirestoreService,
        private alert: AlertController
    ) {}

    ngOnInit(){
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

    tryRegister(value){
        this.authService.registerUser(value)
            .then(res => {
                console.log(res);
                this.errorMessage = "";
                this.successMessage = "Your account has been created. Please log in.";
                this.database.putUser(value.email);
                this.showAlert();
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
                this.successMessage = "";
            })
    }

    async showAlert() {
        const alert = await this.alert.create({
            header: 'Registration Successful',
            message: this.errorMessage,
            buttons: [
                {
                    text: 'Go To Login',
                    handler: value => {
                        this.navCtrl.navigateBack("/login");
                    }
                }
            ]
        });

        await alert.present();
    }

    validatePassword(){
        return this.validations_form.value.password === this.validations_form.value.validate;
    }

    goLoginPage(){
        this.navCtrl.navigateBack('');
    }

}
