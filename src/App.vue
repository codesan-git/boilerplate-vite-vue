<script setup lang="ts">
import { ref } from 'vue'
import Todo from './components/Todo.vue';
import Todos from './components/Todos.vue'

const visitedPosts = ref(new Set())
    const isVisited = (id: number) => visitedPosts.value.has(id)

    const todoId = ref(-1)
    const setTodoId = (id: number) => {
      visitedPosts.value.add(id)
      todoId.value = id
    }

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <!-- <Table /> -->
  <Todo v-if="todoId > -1" :todoId="todoId" @setTodoId="setTodoId" />
  <Todos v-else :isVisited="isVisited" @setTodoId="setTodoId" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
