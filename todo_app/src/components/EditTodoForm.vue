<template>
  <form class="my-form" @submit="updateItem">
    <h3>Edit</h3>
    <input type="checkbox" id="edit-isComplete" v-model="isComplete">
    <input type="text" id="edit-name" v-model="name">
    <input type="submit" value="Save">
    <a @click="clearItem" aria-label="Close">&#10006;</a>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import EventBus from '../EventBus';
export default {
  name: 'EditTodoForm',

  props: {
    todo: Object,
  },

  data() {
    return {
      name: this.todo.name,
      isComplete: this.todo.isComplete,
    }
  },

  methods: {
    ...mapActions('todos', [
      'updateToDo',
    ]),

    clearItem() {
      EventBus.$emit('ToDo.Edited')
    },

    updateItem(e) {
      e.preventDefault()
      const todo = Object.assign({}, this.todo, { name: this.name, isComplete: this.isComplete })

      this.updateToDo(todo).then(() => {
        this.clearItem()
      })
    }
  },
}
</script>
