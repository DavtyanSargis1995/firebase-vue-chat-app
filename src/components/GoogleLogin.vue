<template>
    <div>
        <h4 class="mt-5 px-3">Sign in to usa a real-time Firebase chat app</h4>
        <button class="mt-5 btn btn-light sign-in" @click="login">
            <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="">
            <span>Sign In With Google</span>
        </button>
    </div>
</template>

<script>
// import * as firebase from "firebase"

import firebase from 'firebase/app';
import 'firebase/auth';

import {db} from '../config'
export default {
    name: 'GoogleLogin',
    methods: {
        login() {
            console.log(firebase)
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(
                async (result) => {
                    const userDoc = db.collection('Users').doc(result.user.uid)
                    if (result.additionalUserInfo.isNewUser) {
                        await userDoc.set({
                            name: result.user.displayName,
                            email: result.user.email,
                            userId: result.user.uid,
                            user_img: result.user.photoURL
                        })
                    } 
                    this.$store.dispatch('auth')
                }
            ).catch(console.error)
        }
    }
}
</script>

<style scoped>
.sign-in span{
  margin-left: 20px;
  color: #333;
  font-weight: bold;
}
.sign-in img {
    height: 50px;
}
</style>