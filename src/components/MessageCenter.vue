<template>
  <transition-group name="message-list" tag="div" role="messages">
    <MessageItem class="message-item" 
       v-for="message in messages"
       v-bind:key="message.id" 
       v-bind:data="message"
       @onExpired="onExpired">
        {{ message.content }}
    </MessageItem>
  </transition-group>
</template>

<script lang="ts">
import { Message } from './../interfaces';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import MessageItem from './MessageItem.vue';

@Component({
  components: {
    MessageItem,
  },
})
export default class MessageCenter extends Vue {
  @Prop() private message!: Message;

  private messages!: Message[];
  private index: number = 0;

  public data(): any {
    return {
      messages: [],
    };
  }

  public onExpired(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }

  @Watch('message')
  public listenMessage() {
    this.messages.push(this.message);
  }
}
</script>

<style>
.message-item {
    transition: all .3s;
}
</style>