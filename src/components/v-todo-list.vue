<template>
    <div class="padding-top-05 padding-bottom-05">
        Filter completed
        <div class="d-flex g-gap-1">
            <label for="completed1" class="form-standard c-pointer f-size-small d-flex a-items-center" @click="completed='';getTodos('', this.priority)">
                <span>All</span>
                <input  id="completed1" type="radio" name="completed" checked value="''">
            </label>
            <label for="completed2" class="form-standard c-pointer f-size-small d-flex a-items-center"  @click="completed=true;getTodos(true, this.priority)">
                <span>Completed</span>
                <input id="completed2" type="radio" name="completed" value="true">
            </label>
            <label for="completed3" class="form-standard c-pointer f-size-small d-flex a-items-center" @click="completed=false;getTodos(false, this.priority)">
                <span>Not completed</span>
                <input id="completed3" type="radio" name="completed" value="false">
            </label>
        </div>
    </div>
    <div class="padding-top-05 padding-bottom-05">
        Filter priority
        <div class="d-flex g-gap-1">
            <label for="priority1" class="form-standard c-pointer f-size-small d-flex a-items-center" @click="priority='';getTodos(this.completed, '')">
                <span>All</span>
                <input  id="priority1" type="radio" name="priority" checked value="''">
            </label>
            <label for="priority2" class="form-standard c-pointer f-size-small d-flex a-items-center"  @click="priority=1;getTodos(this.completed, 1)">
                <span>Low</span>
                <input id="priority2" type="radio" name="priority" value="1">
            </label>
            <label for="priority3" class="form-standard c-pointer f-size-small d-flex a-items-center" @click="priority=2;getTodos(this.completed, 2)">
                <span>Middle</span>
                <input id="priority3" type="radio" name="priority" value="2">
            </label>
            <label for="priority4" class="form-standard c-pointer f-size-small d-flex a-items-center" @click="priority=3;getTodos(this.completed, 3)">
                <span>High</span>
                <input id="priority4" type="radio" name="priority" value="3">
            </label>
        </div>
    </div>
  <div class="todo_table bvg" style="overflow: auto; max-width: 900px;">


      <div class="d-grid fa-border" style="grid-template-columns: .5fr 1fr 2fr 1fr 1fr;">
          <div class="padding-03 bg-fff f-weight-bold f-size-small o-hidden cut-text" style="width: 100px;">Completed</div>
          <div class="padding-03 bg-fff f-weight-bold  f-size-small o-hidden cut-text" style="width: 180px;">Title</div>
          <div class="padding-03 bg-fff f-weight-bold f-size-small o-hidden cut-text" style="width: 300px;">Description</div>
<!--          <div class="padding-03 bg-fff f-weight-bold" style="width: 250px;">Creation date</div>-->
          <div class="padding-03 bg-fff f-weight-bold f-size-small o-hidden cut-text" style="width: 100px;">Priority</div>
          <div class="padding-03 bg-fff f-weight-bold f-size-small o-hidden cut-text" style="width: 170px;">Menu</div>
      </div>
      <div v-for="todo in this.todos" class="d-grid fa-border  a-items-center" style="grid-template-columns: .5fr 1fr 2fr 1fr 1fr;" :key="todo.id">
          <div :class="`padding-03 bg-fff f-weight-bold d-flex a-items-center ${todo.completed ? 'color-blue': 'c-red'}`" style="width: 100px; height: 30px;">{{todo.completed ? 'Yes' : 'No'}}</div>
          <div class="padding-03 bg-fff o-hidden cut-text d-flex a-items-center" :title="todo.title" style="width: 180px; height: 30px;">{{todo.title}}</div>
          <div class="padding-03 bg-fff o-hidden cut-text d-flex a-items-center" :title="todo.description" style="width: 300px; height: 30px;">{{todo.description}}</div>
<!--          <div class="padding-03 bg-fff f-size-small" style="width: 250px;">{{todo.creation_date}}</div>-->
          <div class="padding-03 bg-fff d-flex a-items-center" style="width: 100px; height: 30px;">
              <span v-if="todo.priority === 1"  class="c-blue-opacity padding-03 bg-fff">low</span>
              <span v-if="todo.priority === 2" class="c-olivie padding-03 bg-fff">middle</span>
              <span v-if="todo.priority === 3" class="c-red padding-03 bg-fff">high</span>
          </div>
          <div class="padding-03 bg-fff f-size-small d-flex g-gap-1 a-items-center" style="width: 170px;">
              <span class="c-pointer c-content-hover c-red fa-border bg-ccc-opacity" style="width: 80px;" @click="onCompleted(todo.id)" v-if="todo.completed">not ready</span>
              <span class="c-pointer c-content-hover color-blue fa-border bg-ccc-opacity" style="width: 80px;" @click="onCompleted(todo.id)" v-else>ready</span>

              <span class="c-pointer c-content-hover color-blue form-standard" @click="updatedId=todo.id"><i class="fa fa-pencil-square" aria-hidden="true"></i></span>
              <span @click="this.deleteId=todo.id" class="c-pointer c-content-hover c-red form-standard"><i class="fa fa-trash" aria-hidden="true"></i></span>
          </div>
      </div>

      <v-alert-modal @close="deleteId=null" label="do you want to remove the todo ?" @confirm="onDelete" class="animation-from-hidden" v-if="deleteId"/>
      <v-todo-update-form :todo_id="this.updatedId" v-if="this.updatedId" class="animation-from-hidden" @close="updatedId=null"/>
  </div>


</template>

<script>
import VAlertModal from "@/components/_general/v-alert-modal.vue";
import VTodoUpdateForm from "@/components/v-todo-update-form.vue";

export default {
    name: "v-todo-list",
    components: {VTodoUpdateForm, VAlertModal},
    data(){
       return{
           completed: '',
           priority: '',
           deleteId: null,
           updatedId: null,
           todos: []
       }
    },

    mounted() {
        this.getTodos(this.completed, this.priority)
    },

    methods: {
        getTodos(completed, priority){
            this.$store.dispatch("todo/GET", `?page=1&per_page=10&completed=${completed}&priority=${priority}`).then(data => {
                if(data.success)
                    this.todos = data.obj
            })
        },
        onDelete(){
            this.$store.dispatch("todo/DELETE", this.deleteId).then(data => {
                if(data.success)
                    location.reload()
            })
        },
        onCompleted(id){
            this.$store.dispatch("todo/PATCH", id).then(data => {
                if(data.success){
                    this.todos.forEach(todo => {
                        if(todo.id === id)
                            todo.completed = !todo.completed
                    })
                }
            })
        }
    }
}
</script>

<style scoped>

</style>