<template>
    <div class="users d-flex flex-wrap py-1 w-100">
        <div v-for="user in users" :key="user.id" class="user-item" :title="user.name" :class="{loggedIn: user.loggedIn}">
            <img class="user-img" :src="user.user_img" />
        </div>
        <p class="more" v-if="$store.state.allUsers && $store.state.allUsers.length - users.length > 0"> and {{$store.state.allUsers.length - users.length}} more </p>
    </div>
</template>

<script>
export default {
    name: 'Users',
    computed: {
        users(){
            if(this.$store.state.allUsers) {
                return this.$store.state.allUsers.slice(0,5)
            }
            return []
            
        }
    }
}
</script>

<style>
    .user-item {
        margin-right: 10px; 
        position: relative;
        max-width: 50px;
        position: relative;
    }

    .user-img {
        width: 100%
    }

    .user-item.loggedIn::after {
        content: '';
        width: 15px;
        height: 15px;
        background: #6fc46f;
        position: absolute;
        top: 0px;
        right: 0px;
        border-radius: 50%;
    }

    .more {
        padding-top: 15px;
    }

    @media screen and (max-width:576px) {
        .user-item {
            max-width: 30px;
        }

        .user-item.loggedIn::after {
            width: 8px;
            height: 8px;
        }

        .more {
            padding-top: 5px;
        }

    }
    .user-img {
        border-radius: 50%;
    }

    .users p {
        font-size: 14px;
        text-align: center;
    }

</style>