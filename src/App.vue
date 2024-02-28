<script setup lang="ts">
import { ref } from 'vue'
import Todo from './components/Todo.vue';
import Todos from './components/Todos.vue';
import LeftSideBar from './components/LeftSideBar.vue';
const visitedPosts = ref(new Set())
    const isVisited = (id: number) => visitedPosts.value.has(id)

    const todoId = ref(-1)
    const setTodoId = (id: number) => {
      visitedPosts.value.add(id)
      todoId.value = id
    }

</script>

<template>
  <main>
    <div>
      <LeftSideBar />
      <Todo v-if="todoId > -1" :todoId="todoId" @setTodoId="setTodoId" />
      <Todos v-else :isVisited="isVisited" @setTodoId="setTodoId" />
    </div>
  </main>
  <!-- <Table /> -->
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
