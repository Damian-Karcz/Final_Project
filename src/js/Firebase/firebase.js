import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDp6wGRU9cxJY8cYRcKMSFdebyL3oGIetQ",
    authDomain: "mymenu-dd698.firebaseapp.com",
    databaseURL: "https://mymenu-dd698.firebaseio.com",
    projectId: "mymenu-dd698",
    storageBucket: "mymenu-dd698.appspot.com",
    messagingSenderId: "753609194520"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    getCurrentUser = () => this.auth.currentUser?.email

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

}

export default Firebase;

