<template>
  <div style="margin: 8px 0; max-width: 600px;">
    <a-card body-style="padding: 0 12px">
      <a-list ite-layout="horizontal" :date-source="taskList">
        <template #renderItem="{ item, index }">
          <a-list-item>
            <template #actions>
              <a-button type="text" danger @click="doDelete(index)">
                删除
              </a-button>
            </template>
            <a-list-item-meta>
              <template #title>
                {{ item.name }}
              </template>
              <template #description>
                创建时间: {{ MyDayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}
              </template>
              <template #avatar>
                <a-checkbox v-model:checked="item.isFinished" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useTodoStore } from './todoStore';
import MyDayjs from '../../../plugins/myDayjs'

interface TodoBoxProps {
  toady: boolean
}

const props = withDefaults(defineProps<TodoBoxProps>(), {})
const { toady } = toRefs(props)

const { taskList, deleteTask } = useTodoStore()

const doDelete = (index: number) => {
  deleteTask(index)
}
</script>

<style scoped></style>
