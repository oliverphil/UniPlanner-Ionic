import {Injectable} from '@angular/core';
import * as firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
  }

  async registerUser(value) {
    let {email, password} = value

    let create = await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((newUserCredentials: firebase.auth.UserCredential) => {
        firebase.firestore()
          .doc(`/users/${newUserCredentials.user.uid}`)
          .set({email})
        return true
      })
      .catch(err => {
        return false;
      })
    // return new Promise<any>((res) => {
    //   return create
    // })
    return create
  }

  static logout() {
    firebase.auth().signOut()
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            console.log("Log Out");
            resolve();
          }).catch((error) => {
          reject();
        });
      }
    })
  }
}

export function userDetails() {
  return firebase.auth().currentUser;
}
