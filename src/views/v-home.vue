<template>
  <div>
      <div class=" padding-2 d-grid j-content-center">
          <v-todo-create @todoCreate="todoCreateForm=true"/>
          <v-todo-list/>
      </div>
  </div>

  <v-todo-create-form v-if="todoCreateForm" @close="todoCreateForm=false"/>
</template>

<script>
import VTodoList from "@/components/v-todo-list.vue";
import VTodoCreate from "@/components/v-todo-create.vue";
import VTodoCreateForm from "@/components/v-todo-create-form.vue";

export default {
    name: "v-home",
    components: {VTodoCreateForm, VTodoCreate, VTodoList},
    data(){
        return{
            todoCreateForm: false
        }
    }
}
</script>

<style scoped>

</style>