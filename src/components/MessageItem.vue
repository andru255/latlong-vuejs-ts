<template>
  <p><slot></slot></p>
</template>

<script lang="ts">
import { Message } from './../interfaces';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class MessageItem extends Vue {
  @Prop() private data!: Message;

  public mounted() {
    setTimeout(() => this.$emit('onExpired', this.data), this.data.timeout);
  }
}
</script>
