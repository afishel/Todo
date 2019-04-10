<template>
  <tr>
    <td>
      <input type="checkbox" disabled v-model="todo.isComplete">
    </td>
    <td>{{ todo.name }}</td>
    <td>{{ formatDate(todo.createdAt, 'L LT') }}</td>
    <td>{{ formatDate(todo.updatedAt, 'L LT') || '-' }}</td>
    <td v-if="!todo.deletedAt">
      <button @click="editItem">Edit</button>
    </td>
    <td v-if="!todo.deletedAt">
      <button @click="deleteItem">Delete</button>
    </td>
    <td v-if="todo.deletedAt">
      <button @click="restoreItem">Restore</button>
    </td>
    <td v-if="todo.deletedAt">
      <button @click="destroyItem">Permanently Delete</button>
    </td>
  </tr>
</template>

<script>
import DateMixin from "../mixins/Date"
import { mapActions } from 'vuex';
import EventBus from '../EventBus';

export default {
  name: 'TodoItem',

  mixins: [ DateMixin ],

  props: {
    todo: Object,
  },

  methods: {
    ...mapActions('todos', [
      'deleteToDo',
    ]),

    ...mapActions('trashed', [
      'destroyToDo',
      'restoreToDo',
    ]),

    editItem() {
      this.$emit('edit', this.todo)
    },

    deleteItem() {
      this.deleteToDo(this.todo).then(() => {
        EventBus.$emit('ToDo.Deleted')
      })
    },

    destroyItem() {
      this.destroyToDo(this.todo).then(() => {
        EventBus.$emit('ToDo.Destroyed')
      })
    },

    restoreItem() {
      this.restoreToDo(this.todo).then(() => {
        EventBus.$emit('ToDo.Restored')
      })
    },
  }
}
</script>
