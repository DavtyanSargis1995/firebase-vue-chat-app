<template>
    <section class="room-holder">
        <!-- <div class="room-header">Chat header</div> -->
        <div class="room-content" ref="roomContent">
            <ChatItem 
                v-for="message in messages" 
                :key="message.id" 
                :class-name="message.uid === currentUser ? 'my' : ''" 
                :message = "message"
            />
        </div>
        <div class="room-footer mt-3">
            <div class="send-message d-flex justify-content-between">
                <textarea class="w-100 border-0" v-model="messageText" placeholder="Type your message..."></textarea>
                <img src="../assets/send.svg" alt="" @click="sendMessage">
            </div>
        </div>
    </section>
</template>

<script>
import ChatItem from './ChatItem'
import {database} from '../config'
export default {
    name: 'Room',
    components: {
        ChatItem
    },
    mounted(){
       this.scrollDown()
    },
    computed: {
        messages(){
            return Array.from(this.$store.state.messages).reverse()
        },
        currentUser() {
            return this.$store.state.user.userId
        }
    },
    data(){
        return {
            numbers: [1,2,3,4,5],
            messageText: ''
        }
    },
    watch: {
        messages(oldVal, newVal) {
            if(oldVal.length !== newVal.length) {
                this.scrollDown()
            }
        }   
    },
    methods: {
        sendMessage() {
            if(!this.messageText) {
                return
            }
            database.ref(
						`messages/${this.$store.state.user.userId}-${new Date().getTime()}-${Math.floor(Math.random() * 1000) + 1}`
					)
					.set({
						createdAt: new Date().getTime(),
						username: this.$store.state.user.name,
						uid: this.$store.state.user.userId,
                        text: this.messageText,
                        image: this.$store.state.user.user_img
                    })
            this.messageText = ''
        },

        scrollDown() {
            this.$nextTick(() => {
                if (!this.$refs.roomContent) {
                    return
                }

                this.$refs.roomContent.scrollTop = this.$refs.roomContent.scrollHeight
            })
        }

    }
}
</script>

<style scoped>
.room-holder {
    padding: 10px 0;
    background: #fff;
    padding: 20px;
}

.room-header {
    border-bottom: 1px solid #333;
}

.send-message {
    width: 100%;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid #D6DDE3;
}

.send-message img {
    cursor: pointer;
}

.send-message textarea{
    width: 100%;
    outline: none;
    resize: none;
}

.send-message button{
    width: 100px;
    outline: none;
    resize: none;
}

.room-content {
    height: calc(100vh - 280px);
    overflow-y: scroll;
}

@media screen and (max-width:576px) {
    .room-content {
        height: calc(100vh - 250px);
    }
}

</style>