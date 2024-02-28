<script lang="ts">
import { defineComponent } from 'vue'
import { useQuery } from '@tanstack/vue-query'

import { Todo } from '../types';

const fetcher = async (id:number): Promise<Todo> =>
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((response) =>
    response.json(),
  )

  export default defineComponent({
  name: 'TodoDetails',
  props: {
    todoId: {
      type: Number,
      required: true,
    },
  },
  emits: ['setTodoId'],
  setup(props) {
    const { isPending, isError, isFetching, data, error } = useQuery({
      queryKey: ['post', props.todoId],
      queryFn: () => fetcher(props.todoId),
    })

    return { isPending, isError, isFetching, data, error }
  },
})

</script>

<template>
<h1>Post {{ todoId }}</h1>
  <a @click="$emit('setTodoId', -1)" href="#"> Back </a>
  <div v-if="isPending" class="update">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <h1>{{ data.id }}{{ data.completed }}</h1>
    <div>
      <p>{{ data.title }}</p>
    </div>
    <div v-if="isFetching" class="update">Background Updating...</div>
  </div>
</template>

<style>

</style>