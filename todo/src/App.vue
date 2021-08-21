<template>
  <div id="login">
    <div class="flex max-w-screen-md m-auto h-auto p-4 flex-col bg-purple-50 text-lg rounded">
	
    <div class="w-full p-8 rounded">

    <form  @submit.prevent="login">
     
      <input v-model="email" placeholder="email" type="text" class="w-full mt-1 mb-4 py-1 px-3  focus:outline-none focus:ring-2 focus:ring-purple-600 rounded" @keyup.enter="addTodo()">

      <input v-model="pw" placeholder="password" type="password" class="w-full mt-1 mb-4 py-1 px-3  focus:outline-none focus:ring-2 focus:ring-purple-600 rounded" @keyup.enter="addTodo()">
      <button class=" bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded">Login</button>

    </form>
 </div> </div>
  </div>

  <div id="nav">
    <router-link to="/">Home</router-link> 
    <router-link to="/register">Register</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      email: '',
      pw: 'password'
    }
  },
  computed: {
  ...mapGetters(['allTodos'])
  },
  methods:{
    login(){
      let [email, pw] =  [this.email, this.pw] 
      this.$store.dispatch('login', {email, pw})
    },
  },
  mounted(){
    //this.$store.dispatch('fetchData')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #8B5CF6;
    margin: 0.5rem;
    padding: 8px 10px;
    border: 1px #6D28D9 solid;
    border-radius: 10px;
    &.router-link-exact-active {
      background: #6D28D9;
      color: #fff;
    }
  }
}
</style>
