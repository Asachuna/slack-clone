<template>
  <div style="height: 100%;">
    <ChatArea v-if="!!$store.state.channelState"/>
    
    <div style="position: sticky; bottom: 0px;">
      <ChatForm v-if="!!$store.state.channelState"/>
    </div>
  </div>
</template>

<script>
import ChatArea from "../components/App/ChatArea.vue";
import ChatForm from '../components/App/ChatForm.vue';
import "firebase/compat/auth";

export default {
  
  name: 'Home',
  
  components: {
    ChatArea,
    ChatForm
  },
};
</script>
