<template>
  <div class="">
      <button class="form-standard c-pointer" @click="this.$emit('todoCreate')">Create todo</button>
  </div>
</template>

<script>
export default {
    name: "v-todo-create"
}
</script>

<style scoped>

</style>