<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>login</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from '../composables/useLogin'
export default {
  setup(props, context) {
    // const email = ref("");
    // const password = ref("");
    const email = ref("test3@test3.com");
    const password = ref("test1234");

    const { error, login} = useLogin()

    const handleSubmit = async () => {
      await login(email.value, password.value)

      if(!error.value){
        // emit custom event
        context.emit('login')
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style></style>
