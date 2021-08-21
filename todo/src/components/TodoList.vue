<template>
<div class="home flex max-w-screen-md m-auto h-auto p-4 flex-col bg-purple-50 text-lg rounded">
	
    <div class="w-full p-8 rounded">

      <label>Type do add a new to do </label>
      <input v-model="newTodo" name="newTodo" type="text" class="w-full mt-1 mb-4 py-1 px-3  focus:outline-none focus:ring-2 focus:ring-purple-600 rounded" @keyup.enter="addTodo()">

      <button class=" bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded" @click="addTodo()">Add</button>
    </div>

  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden border-b border-purple-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-purple-200">
            <thead class="bg-purple-200">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-sm text-purple-500 uppercase tracking-wider">
                  Id
                </th>
                <th scope="col" class="px-6 py-3 text-left text-sm text-purple-500 uppercase tracking-wider">
                  Task
                </th>
                <th scope="col" class="px-6 py-3 text-left text-sm text-purple-500 uppercase tracking-wider">
                  Completed
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-purple-200">
              <tr v-for="todo in todos" :key="todo.id">
                <td class="px-6 py-4 text-left whitespace-nowrap text-lg text-gray-900">
                  {{ todo.id }} 
                </td>
                <td @click="riscar(todo)" class="px-6 py-4 text-left whitespace-nowrap text-lg text-gray-900" :class="{'line-through text-purple-900':todo.status}">
                  {{ todo.task }}
                </td>
                <td class="px-6 py-4 text-left text-lg text-gray-500">
                  <input type="checkbox" v-model="todo.status">
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                  <a href="#" class="text-purple-600 hover:text-purple-900" @click="removeTodo(index)">&times;</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      newTodo: '',
    }
  },
  computed: {
  ...mapState(['todos'])
  },
  methods:{
    addTodo() {
      console.log("foi")
      if (this.newTodo.trim().length == 0) {
        return
      }
      this.$store.dispatch('addTodo', {
        task: this.newTodo,
        status: false,
      })

      this.newTodo = ''
    },
    riscar(todo){
      todo.status = !todo.status
      this.$store.dispatch('updateTodo', todo)
    },
    removeTodo(todo){
      this.$store.dispatch('deleteTodo', todo)
    }
  }
}

</script>
