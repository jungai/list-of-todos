<script setup lang="ts">
import { ref, onMounted } from "vue";

// reactive state
const newTodo = ref("");
const todos = ref<string[]>([]);

const addTodo = () => {
  todos.value.push(newTodo.value);
  newTodo.value = "";
};

const removeTodo = (index: number) => {
  todos.value.splice(index, 1);
};

onMounted(() => {
  document.documentElement.style.setProperty("--app-color", "green");
});
</script>

<template>
  <div class="container">
    <h1>With <span class="app-color">Vue</span></h1>
    <input
      class="input"
      v-model="newTodo"
      placeholder="กรอก ...."
      @keyup.enter="addTodo"
    />
    <ul class="display">
      <li class="item" v-for="(todo, index) in todos" :key="index">
        {{ todo }}
        <button @click="removeTodo(index)">X</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import "../../core.css";
</style>
