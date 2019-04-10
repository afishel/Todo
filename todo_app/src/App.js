import { mapActions, mapState } from 'vuex'
import EventBus from './EventBus';

const AddTodoForm = () => import(/* webpackChunkName: "AddTodoForm" */ './components/AddTodoForm')
const EditTodoForm = () => import(/* webpackChunkName: "EditTodoForm" */ './components/EditTodoForm')
const TrashedTodos = () => import(/* webpackChunkName: "TrashedTodos" */ './components/TrashedTodos')
const TodoItem = () => import(/* webpackChunkName: "TodoItem" */ './components/TodoItem')

export default {
  name: 'app',

  data() {
    return {
      trashed: [],
      editTodo: {},
    }
  },

  components: {
    AddTodoForm,
    EditTodoForm,
    TrashedTodos,
    TodoItem,
  },

  computed: {
    ...mapState('todos', [
      'items',
    ]),

    counter() {
      const count = this.items.length
      const name = count === 1 ? 'to-do' : 'to-dos'
      return `${count} ${name}`
    },
  },

  methods: {
    ...mapActions('todos', [
      'getToDos'
    ]),

    editItem(todo) {
      this.editTodo = todo
    },
  },

  mounted() {
    EventBus.$on('ToDo.Added', this.getToDos)
    EventBus.$on('ToDo.Deleted', this.getToDos)
    EventBus.$on('ToDo.Restored', this.getToDos)
    EventBus.$on('ToDo.Edited', () => {
      this.editTodo = {}
      this.getToDos()
    })

    this.getToDos()
  },
}
