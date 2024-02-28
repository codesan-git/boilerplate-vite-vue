<template>
  <h1 class="text-9xl text-red-500">Todos</h1>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        <a
          @click="$emit('setTodoId', item.id)"
          href="#"
          class="text-8xl"
          :class="{ kocak: props.isVisited(item.id)  }"
          >{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { Todo } from '../types'
import axios from 'axios'

const props = defineProps<{
  isVisited: (id:number)=>boolean
}>()
// const emits = defineEmits(['setTodoId'])

const { isPending, isError, data, error } = useQuery<Todo[]>({
      queryKey: ['todos'],
        queryFn: async ():Promise<Todo[]> => {
        try {
          const response = await axios
          .get('https://jsonplaceholder.typicode.com/todos');
          console.log(`response`, response.data)
          return response.data;
        } catch (error) {
          console.log(`error`)
          throw error;
        }
      },
    })

</script>

<style scoped>
.kocak {
  font-weight: bold;
  color: green;
  font-size: small;
}
</style>