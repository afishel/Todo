<template>
  <form action="javascript:void(0);" method="POST" @submit="addItem">
    <h3>Add</h3>
    <input type="text" id="add-name" placeholder="New to-do" v-model="name">
    <input type="submit" value="Add">
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import EventBus from '../EventBus'

export default {
  name: 'AddTodoItem',

  data() {
    return {
      name: '',
      isComplete: false,
    }
  },

  methods: {
    ...mapActions('todos', [
      'createToDo',
    ]),

    addItem(e) {
      e.preventDefault()
      const todo = {
        name: this.name,
        isComplete: this.isComplete,
      }

      if (this.name) {
        this.createToDo(todo).then(() => {
          this.resetForm()
          EventBus.$emit('ToDo.Added')
        })
      }
    },

    resetForm() {
      this.name = ''
      this.isComplete = false
    },
  },
}
</script>
