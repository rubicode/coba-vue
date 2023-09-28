<script setup>
import { onMounted } from 'vue'
import TodoItem from './TodoItem.vue'
import { useTodosStore } from '../stores/todos'

const store = useTodosStore()

onMounted(() => {
    store.loadTodo()
})
</script>

<template>
    <div>
        <TodoItem v-for="(todo, index) in store.todos" :key="todo.id" :no="index" :todo="todo" />
    </div>
</template>