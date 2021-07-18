<template>
  <div id="app">
    <Header />
    <Loader v-if="authLoading"/>
    <main v-else :class="{loggedInState: authenticated}">
        <GoogleLogin v-if="!authenticated"/>
        <div v-else>
          <div class="d-flex jusitfy-content-between users-holder" style="padding: 20px">
            <Users v-if="authenticated"/>
            <button @click="logout" class="btn btn-primary align-self-center">Logout</button>
          </div>
          <Room />
        </div>
    </main>
  </div>
</template>

<script>
import Room from './components/Room'
import GoogleLogin from './components/GoogleLogin'
import Header from './components/Header'
import Users from './components/Users'
import Loader from './components/Loader'

export default {
  name: 'App',
  components: {
    Room,
    GoogleLogin,
    Header,
    Users,
    Loader
  },
  data(){
    return {
      authLoading: false
    }
  },
  async mounted(){
    this.authLoading = true
    await this.$store.dispatch('auth')
    this.authLoading = false
  },
  computed: {
    authenticated(){
      return this.$store.state.user
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

main {
  width: 60%;
  margin: 0 auto;
  left: 0;
  right: 0;
}

@media screen and (max-width:576px) {
  main {
    width: 100%;
  }
}

.users-holder {
  height: 100px;
}

@media screen and (max-width:576px) {
  .users-holder {
    height: 70px;
  }
}

main.loggedInState {
  position: fixed;
  bottom: 10px;
  background: rgb(244, 244, 244);
}

  /* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}
</style>
