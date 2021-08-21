import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    username: localStorage.username ?? 'nothing',
    token:'',
    todos: [
      {
        id: 1,
        task: 'start to add more tasks',
        status: false,
      }
    ],
  },
  getters:{
    allTodos: state => state.todos.filter(i => !i.status)   
  },
  mutations: {
    set_token(state, token){
      state.token = token
    },
    set_todo(state, tasks){
      state.todos = tasks
    },
    add_todo(state, newTodo){
      state.todos.push(newTodo)
    },
    update_todo(){
      //const index = state.todos.findIndex(el => el.id == id)
      //state.todos.find(index) = todo.status = !todo.status
    },
    delete_todo(state, id) {
      const index = state.todos.findIndex(el => el.id == id)
      state.todos.splice(index, 1)
    },
  },
  actions: {
    async fetchData({ commit }) {
      console.log("pegando na api")
      let response = await axios.get('http://localhost:8000/api/task', {
        headers: {
        'Authorization': `Bearer ${this.state.token}`
        }
      })
      let tasks = await response.data
      commit('set_todo', tasks)
    },
    async addTodo({commit}, todo) {
      console.log("add todo")
      let addedTodo = await axios.post(`http://127.0.0.1:8000/api/task`,{
        'task': todo.task,
        'status': todo.status ? 1 : 0
      }, {
        headers: {
          'Authorization': `Bearer ${this.state.token}`
          }
      })
      commit('add_todo', addedTodo.data)
    },
     async updateTodo({commit}, todo) {
      console.log(todo.id)
      let response = await axios.put(`http://127.0.0.1:8000/api/task/${todo.id}`,{
        'task': todo.task,
        'status': todo.status ? 1 : 0
      }, {
        headers: {
        'Authorization': `Bearer ${this.state.token}`
        }
      })
      console.log(response.json)
      commit('update')
    },
    async deleteTodo({commit},todo) {
      /* setTimeout(() => {
        context.commit('delete_todo', id)
      }, 100) */
      console.log(todo.id)
      let response = await axios.delete(`http://127.0.0.1:8000/api/task/${todo.id}`)
      console.log(response)
      commit('delete_todo', todo.id)
    },
    async login({commit, dispatch}, data) {
      console.log("fazendo login")
      let response = await axios.post(`http://127.0.0.1:8000/api/auth/login`,{
        'email': data.email,
        'password': data.pw
      })
      console.log(response)

      let token = response.data.access_token
      commit('set_token', token)
      dispatch('fetchData')
    }
  },
  modules: {
  }
})
