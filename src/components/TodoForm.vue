<script setup>
import { ref } from 'vue'
import { useTodosStore } from '../stores/todos'

const store = useTodosStore()

const title = ref('')

function submit(e) {
    e.preventDefault()
    store.addTodo(title.value)
    title.value = ''
}
</script>

<template>
    <div>
        <form v-on:submit="submit">
            <input type="text" v-model="title" placeholder="title" />
            <button type="submit">simpan</button>
        </form>
    </div>
</template>