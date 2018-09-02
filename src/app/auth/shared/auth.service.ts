import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Login, LogoutConfirmed } from '../store/actions/auth.actions';
import { AppState } from '../../app.reducers';
import UserCredential = firebase.auth.UserCredential;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly ID_TOKEN = 'id_token';

  constructor(private store: Store<AppState>) {
    firebase.auth().onIdTokenChanged(user => {
      if (user) {
        this.store.dispatch(new Login(user));
        user.getIdToken().then(token => localStorage.setItem(AuthService.ID_TOKEN, token));
      } else {
        this.store.dispatch(new LogoutConfirmed());
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
