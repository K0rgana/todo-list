<template>
<div id="register">
    <div class="flex max-w-screen-md m-auto h-auto p-4 flex-col bg-purple-50 text-lg rounded">
	
    <div class="w-full p-8 rounded">

    <form  @submit.prevent="register">
        <input v-model="name" placeholder="name" type="text" class="w-full mt-1 mb-4 py-1 px-3  focus:outline-none focus:ring-2 focus:ring-purple-600 rounded">

      <input v-model="email" placeholder="email" type="text" class="w-full mt-1 mb-4 py-1 px-3  focus:outline-none focus:ring-2 focus:ring-purple-600 rounded">

      <input v-model="pw" placeholder="password" type="password" class="w-full mt-1 mb-4 py-1 px-3  focus:outline-none focus:ring-2 focus:ring-purple-600 rounded">
      <input v-model="pw2" placeholder="password" type="password" class="w-full mt-1 mb-4 py-1 px-3  focus:outline-none focus:ring-2 focus:ring-purple-600 rounded">
      <button class=" bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded">Register</button>

    </form>
 </div> </div>
  </div>

</template>

<script>
export default {
  components: {
            
  },
  data () {
    return {
      name: '',
      email: '',
      pw: '',
      pw2: ''
    }
  },
  methods: {
    register () {
      if (this.pw !== this.pw2) {
        console.log('passwords not match')
        return
      }
      const userData = {
        name: this.name,
        email: this.email,
        password: this.pw 
      }  
                
      const isCreated = this.$store.dispatch('register', userData)
      if (isCreated) {
        this.$router.push('/')
      } 
    },
    redirectToSignIn () {
      this.$router.push('/')
    }
  }
}
</script>