<template>
  <form action="">
    <textarea
      placeholder="Type a message and hit enter to send"
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import getUser from "@/composables/getUser";
import { ref } from "vue";
import { timestamp } from "@/firebase/config";
import useCollection from "@/composables/useCollection";

export default {
  setup() {
    const message = ref("");
    const { user } = getUser();
    const { error, addDoc } = useCollection("messages");

    const handleSubmit = async () => {
      const chat = {
        user: user.value.displayName,
        message: message.value,
        createdAt: timestamp(),
      };
      console.log(chat);
      await addDoc(chat);
      if(!error.value){
        message.value = "";
      }
    };
    return { message, handleSubmit, error };
  },
};
</script>

<style scoped>
form {
  margin: 10px;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
</style>
