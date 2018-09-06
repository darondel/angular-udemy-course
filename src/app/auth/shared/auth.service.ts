import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  signup(email: string, password: string): Promise<UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

}
