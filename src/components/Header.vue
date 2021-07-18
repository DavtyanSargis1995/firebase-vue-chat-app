<template>
    <div class="header-section" :class="{loggedIn: authenticated}">
        <header>
            <nav class="d-flex justify-content-center align-items-center">
                <img src="../assets/icon.svg" alt=""> 
                <h2 class="text-light">barcamp chat</h2>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Header',
    computed: {
        authenticated(){
            return this.$store.state.user
        }
    },
}
</script>

<style scoped>
    .header-section {
        width: 100%;
        background: #2f64fa;
        position: relative;
        z-index: 3;
        transition: .5s;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .header-section img {
        height: 50px;
    }

    nav {
        height: 80px;
    }

    .header-section.loggedIn nav {
        height: 50px;
    }

    .header-section.loggedIn img {
        height: 30px;
    }

    .header-section.loggedIn h2 {
        font-size: 22px;
    }


    h2 {
        margin-top: 16px;
        margin-left: 20px;
        font-size: 30px;
    }
</style>