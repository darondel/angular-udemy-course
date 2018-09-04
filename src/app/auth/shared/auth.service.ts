import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly ID_TOKEN = 'id_token';

  constructor() {
    firebase.auth().onIdTokenChanged(user => {
      if (user) {
        user.getIdToken().then(token => localStorage.setItem(AuthService.ID_TOKEN, token));
      } else {
        localStorage.removeItem(AuthService.ID_TOKEN);
      }
    });
  }

  get token(): string {
    return localStorage.getItem(AuthService.ID_TOKEN);
  }

  signup(email: string, password: string): Promise<UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

}
