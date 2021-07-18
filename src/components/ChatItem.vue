<template>
    <div class="chat-item d-flex" :class="className">
        <img :src="message.image" alt="" v-if="message.uid !== currentUserId">
        <div class="message-text">
            {{message.text}}
            <p class="message-info mt-2">
                <span v-if="message.uid !== currentUserId"><b>{{message.username}}</b></span>
                <span>{{message.createdAt | formateDate}}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatItem',
    props: {
        className: String,
        message: Object
    },
    filters: {
        formateDate: (val) => {
            return new Date(val).toLocaleString()
        }
    },
    computed: {
        currentUserId(){
            return this.$store.state.user && this.$store.state.user.userId
        }
    }
}
</script>

<style>
.chat-item {
    margin-right: auto;
    margin-bottom: 30px;
    max-width: 400px;
    width: 70%;
}


.message-text {
    background: #FFFFFF;
    -webkit-box-shadow: 0px 20px 30px rgb(0 0 0 / 5%);
    box-shadow: 0px 20px 30px rgb(0 0 0 / 5%);
    border-radius: 10px;
    width: 50%;
    padding: 20px;
    text-align: left;
    width: 100%;
    margin-bottom: 0
}


.message-info {
    text-align: right; 
    font-size: 13px;
    margin-bottom: 0
}

.message-info span {
    display: block;
}

.chat-item.my {
    margin-left: auto;
    margin-right: 0;
}

.chat-item.my .message-text {
    background-color: #2f64fac4;
    color: #fff;
}

.chat-item img {
    width: 30px;
    align-self: flex-end;
    border-radius: 50%;
    margin-right: 10px;
}

@media screen and (max-width: 576px) {
    .chat-item {
        width: 80%
    }
}
</style>