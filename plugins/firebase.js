import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');
import config from '~/firebase.config'

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase