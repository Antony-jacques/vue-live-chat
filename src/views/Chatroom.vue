<template>
  <div class="container">
    <Navbar />
  </div>
</template>

<script>
//get the current user using getUser
// watch the current user for changes
// redirect the user to the welcome page when they are logged out
import Navbar from "../components/Navbar.vue";
import getUser from "@/composables/getUser";
import { projectAuth } from "@/firebase/config";
import { watch } from "vue";
import { useRouter } from "vue-router";
export default {
  components: { Navbar },
  setup() {
    const { user } = getUser();
    const router = useRouter();

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "welcome" });
      }
    });
  },
};
</script>

<style></style>
