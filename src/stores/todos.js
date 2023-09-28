import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const request = axios.create({
    baseURL: 'https://fbapi-45e3d-default-rtdb.asia-southeast1.firebasedatabase.app/',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

export const useTodosStore = defineStore('todos', () => {
    const todos = ref([])
    //const doubleCount = computed(() => count.value * 2)
    async function loadTodo() {
        try {
            const { data } = await request.get('todos.json', { params: { auth: 'oUyjy6KXpd6cGVhciD9Y12OnniqGru2zgDP1BAyz' } })
            todos.value = Object.keys(data).map(key => Object.assign({ id: key }, data[key]))
        } catch (error) {
            console.log(error)
        }
    }

    async function addTodo(title) {
        try {
            const id = uuidv4();
            todos.value.push({ id, title, complete: false })
            const { data } = await request.post('todos.json', { title, complete: false }, { params: { auth: 'oUyjy6KXpd6cGVhciD9Y12OnniqGru2zgDP1BAyz' } })
            todos.value = todos.value.map(todo => {
                if (todo.id === id) {
                    todo.id = data.name
                }
                return todo
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteTodo(id) {
        try {
            const { data } = await request.delete(`todos/${id}.json`, { params: { auth: 'oUyjy6KXpd6cGVhciD9Y12OnniqGru2zgDP1BAyz' } })
            todos.value = todos.value.filter(todo => todo.id !== id)
        } catch (error) {
            console.log(error)
        }
    }

    return { todos, loadTodo, addTodo, deleteTodo }
})
