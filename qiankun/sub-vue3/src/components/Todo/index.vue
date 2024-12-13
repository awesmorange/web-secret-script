<script setup>
import { ref } from 'vue'

const newTodo = ref('')
const todos = ref([
    { id: 1, text: 'Learn Vue', completed: false },
    // { id: 2, text: 'Learn Vuex', completed: false },
    // { id: 3, text: 'Learn Vue Router', completed: false },
])

const createTodo = () => {
    todos.value = [...todos.value, {
        id: 2,
        text: newTodo.value,
        completed: false
    }]
    newTodo.value = ''
}
</script>

<template>
    <div v-for="todo in todos" :key="todo.id" data-test="todo" >
        {{ todo.text }}
        <input type="checkbox" v-model="todo.completed" data-test="todo-checkbox" />
    </div>

    <form data-test="form" @submit.prevent="createTodo">
        <input data-test="new-todo" v-model="newTodo" />
        <button type="submit" data-test="add-todo">Add Todo</button>
    </form>
</template>

<style scoped></style>
