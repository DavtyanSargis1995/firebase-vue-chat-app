import firebase from 'firebase'

const firebaseConfig = {
    // add you firebase app's configs here
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const database = firebase.database() 
const auth = firebase.auth()
const storage = firebase.storage()

export {
    db, 
    database,
    auth,
    storage
}