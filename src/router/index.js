import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chatroom from "../views/Chatroom.vue";
import { projectAuth } from "@/firebase/config";

//auth guard
// to = dest, from the page where we are from, next = function 
const requireAuth = (to, from, next)=> {
  let user = projectAuth.currentUser
  console.log('current user in auth guard', user)
  if(!user){
    next({ name: 'welcome' })
  } else {
    // continue
    next()
  }
}

const requireNoAuth = (to, from, next)=>{
  let user = projectAuth.currentUser
  if(user){
    next({ name: 'Chatroom' })
  } else {
    // continue
    next()
  }
}

const routes = [
  {
    path: "/",
    name: "welcome",
    component: Welcome,
    beforeEnter: requireNoAuth
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,
    beforeEnter: requireAuth
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
