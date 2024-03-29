<template>
  <h1 class="text-9xl text-red-500">Todos {{ taskStore.name }}</h1>
  <div id="task-list">
    <div v-for="task in taskStore.tasks">
      <p>{{ task.title }}</p>
      <Camera
    color="red"
    :size="32"
  />
    </div>
  </div>
  <Form />
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      Hover me
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">1st menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="dataFetch">
    <table>
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr
          v-for="footerGroup in table.getFooterGroups()"
          :key="footerGroup.id"
        >
          <th
            v-for="header in footerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.footer"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </tfoot>
    </table>
    <ul>
      <li v-for="item in dataFetch" :key="item.id">
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
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
} from '@tanstack/vue-table'
import { useQuery } from '@tanstack/vue-query'
import { onMounted, ref } from 'vue'
import type { Todo } from '../types'
import axios from 'axios'
import {useTaskStore} from '../stores/TaskStores'
import { DownOutlined } from '@ant-design/icons-vue';
import Form from './Form.vue';
import { Camera } from 'lucide-vue-next';

const props = defineProps<{
  isVisited: (id:number)=>boolean
}>()

const emits = defineEmits(['setTodoId'])

const taskStore = useTaskStore()

const { isPending, isError, data: dataFetch, error } = useQuery<Todo[]>({
  queryKey: ['todos'],
  queryFn: async ():Promise<Todo[]> => {
    try {
          const {data} = await axios
          .get('https://jsonplaceholder.typicode.com/todos')
          return data;
        } catch (error) {
          throw error;
        }
      },
    })

  const columnHelper = createColumnHelper<Todo>()

  const columns = [
  columnHelper.group({
    header: 'Id',
    footer: props => props.column.id,
    columns: [
      columnHelper.accessor('id', {
        cell: info => info.getValue(),
        footer: props => props.column.id,
      }),
      columnHelper.accessor(row => row.userId, {
        id: 'UserId',
        cell: info => info.getValue(),
        header: () => 'User Id',
        footer: props => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Title',
    footer: props => props.column.id,
    columns: [
      columnHelper.accessor('title', {
        header: () => 'Title',
        footer: props => props.column.id,
      }),
      columnHelper.group({
        header: 'More Info',
        columns: [
          columnHelper.accessor('completed', {
            header: () => 'Visits',
            footer: props => props.column.id,
          }),
        ],
      }),
    ],
  })
]

const dataTable = ref<Todo[]>([])

if(dataFetch.value){
  dataTable.value = JSON.parse(JSON.stringify(dataFetch.value))
}

const table = useVueTable({
  get data() {
    return dataTable.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
})

onMounted(async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
  dataTable.value = JSON.parse(JSON.stringify(data))
})
</script>

<style scoped>
.kocak {
  font-weight: bold;
  color: green;
  font-size: small;
}
</style>