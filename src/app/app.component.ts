import { Component, OnInit } from '@angular/core';

import { firebase } from '@firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCcS0nEndfE5D0Fuds-QCRscPDd9YDoyMI',
        authDomain: 'udemy-super-mega-recipe-book.firebaseapp.com',
        databaseURL: 'https://udemy-super-mega-recipe-book.firebaseio.com',
        projectId: 'udemy-super-mega-recipe-book',
        storageBucket: 'udemy-super-mega-recipe-book.appspot.com',
        messagingSenderId: '1090323281844'
      });
    }
  }

  ngOnInit() {
  }

}
