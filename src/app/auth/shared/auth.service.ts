import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  token: string;

  constructor() {
    firebase.auth().onIdTokenChanged(user => {
      this.user = user;

      if (this.user) {
        this.user.getIdToken().then(token => this.token = token);
      } else {
        this.token = null;
      }
    });
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  getIdToken(): string {
    return this.token;
  }

  signup(email: string, password: string): Promise<UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signinWithEmail(email: string, password: string): Promise<UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signinWithGoogle(): Promise<UserCredential> {
    return firebase.auth().signInWithPopup(new GoogleAuthProvider());
  }

  signinWithFacebook(): Promise<UserCredential> {
    return firebase.auth().signInWithPopup(new FacebookAuthProvider());
  }

  signout(): Promise<void> {
    return firebase.auth().signOut();
  }

}
