import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";

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

  private user = new ReplaySubject<User>(1);

  token: string;

  constructor() {
    firebase.auth().onIdTokenChanged(user => {
      this.user.next(user);

      if (user) {
        user.getIdToken().then(token => this.token = token);
      } else {
        this.token = null;
      }
    });
  }

  get isAuthenticated(): Observable<boolean> {
    return this.user.pipe(
      map(user => user !== null)
    );
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
