import Vue from 'vue'
import Vuex from 'vuex'
import {auth, db, database} from './config'

Vue.use(Vuex)

const state = {
    user: null,
    idToken: null,
    allUsers: null,
    messages: []
}

const mutations = {
    SET_USER: (state, user) => state.user = user,
    ID_TOKEN: (state, idToken) => state.idToken = idToken,
    SET: (state, [key, value]) => state[key] = value,
}

const actions = {
    auth: ({ commit }) => {
        return new Promise((resolve) => {
            console.log('promisei mej em')
            auth.onAuthStateChanged(async user => {
                if (!user || user.providerData[0].providerId !== 'google.com') {
                    resolve({authenticated: false})
                    return commit('SET_USER', false)
                }

                user
                    .getIdToken(true)
                    .then(
                        (idToken) => commit('ID_TOKEN', idToken)
                    )

                const userDoc = await db.collection('Users').doc(user.uid).get()

                db.collection('Users').doc(user.uid).update({loggedIn: true})
                
                const userData = {...userDoc.data(), uid: userDoc.id}
                commit('SET', ['user', userData])
                

                db.collection('Users')
                    .onSnapshot(
                        (querySnapshot) => {
                            const allUsers = querySnapshot.docs.map(
                                u => {
                                    return {
                                        id: u.id,
                                        ...u.data()
                                    }
                                }
                            )
                            commit('SET', ['allUsers', allUsers])
                        }
                    )
                



                commit('SET', ['messages', []])

                const messages = database
                    .ref(`messages`)
                    .orderByChild('createdAt')
                
                const onNewMessage = (snapshot) => {
                    commit('SET', [
                        'messages',
                        [
                            {
                                ...snapshot.val(),
                                id: `messages/${snapshot.key}`
                            },
                            ...state.messages
                        ]
                    ])
                }

                messages.off('child_added')
                messages.on('child_added', onNewMessage)

                resolve({authenticated: true})
            })
        }) 
    },
    logout: ({ commit, state }) => {
        db.collection('Users').doc(state.user.uid).update({loggedIn: false})
        commit('SET_USER', false)
        auth.signOut().then(() => {
            localStorage.setItem('authenticated', false)
        })
    },
}


export default new Vuex.Store({
    state,
    mutations,
    actions
})


