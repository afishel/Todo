<template>
  <div id="app">
    <h1>To-do CRUD</h1>

    <add-todo-form></add-todo-form>

    <edit-todo-form v-if="editTodo.id" :todo="editTodo"></edit-todo-form>

    <p id="counter">{{ counter }}</p>

    <table>
      <thead>
        <tr>
          <th>Is Complete</th>
          <th>Name</th>
          <th>Created</th>
          <th>Updated</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody id="todos">
        <todo-item :todo=todo v-for="todo in items" :key="todo.id" @edit="editItem"></todo-item>
      </tbody>
    </table>

    <trashed-todos></trashed-todos>
  </div>
</template>

<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
