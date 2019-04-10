<template>
  <section class="trashed" v-if="items.length">
    <h2>Trashed</h2>
    <table>
      <thead>
        <tr>
          <th>Is Complete</th>
          <th>Name</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Deleted</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody id="todos">
        <todo-item :todo=todo v-for="todo in items" :key="todo.id"></todo-item>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import EventBus from '../EventBus';

const TodoItem = () => import(/* webpackChunkName: "TodoItem" */ './TodoItem')

export default {
  name: "TrashedTodos",

  computed: {
    ...mapState('trashed', [
      'items',
    ])
  },

  components: {
    TodoItem,
  },

  methods: {
    ...mapActions('trashed', [
      'getTrashed',
    ]),
  },

  mounted() {
    EventBus.$on('ToDo.Deleted', this.getTrashed)
    EventBus.$on('ToDo.Destroyed', this.getTrashed)
    EventBus.$on('ToDo.Restored', this.getTrashed)

    this.getTrashed()
  },
}
</script>
