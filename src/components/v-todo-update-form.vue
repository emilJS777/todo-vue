<template>
    <div class="bg-ccc-opacity p-fixed left-0 top-0 w-max h-max d-flex j-content-center a-items-center">
        <form class="w-max-content bg-fff d-grid g-gap-1 padding-2 box-shadow-slim h-max-content p-relative" @submit="onTodo" style="width: 400px;" v-if="this.form.title !== null">
            <span class="p-absolute right-0 top-0 m-top-1 m-right-1 padding-03 c-pointer c-content-hover" @click="this.$emit('close')">Close</span>
            <p v-if="msg" class="c-red">{{this.msg}}</p>
            <div class="d-grid g-gap-_3">
                <label for="">Title</label>
                <input type="text" v-model="form.title" class="form-standard">
            </div>
            <div class="d-grid g-gap-_3">
                <label for="">Description</label>
                <input type="text" v-model="form.description" class="form-standard">
            </div>
            <div class="d-grid g-gap-_3">
                <label for="">Priority</label>
                <div class="d-flex g-gap-1">
                    <label class="form-standard c-pointer">
                        <label for="1" class="c-blue-opacity">low</label>
                        <input id="1" type="radio" name="priority" v-model="form.priority" :checked="this.form.priority === 1" :value="1" class="form-standard">
                    </label>
                    <label class="form-standard c-pointer">
                        <label for="2" class="c-olivie">middle</label>
                        <input id="2" type="radio" name="priority" v-model="form.priority" :checked="this.form.priority === 2" :value="2" class="form-standard">
                    </label>
                    <label class="form-standard c-pointer">
                        <label for="3" class="c-red">high</label>
                        <input id="3" type="radio" name="priority" v-model="form.priority" :checked="this.form.priority === 3" :value="3" class="form-standard">
                    </label>
                </div>
            </div>
            <div class="d-flex g-gap-_3">
                <button class="form-standard c-pointer m-top-05 w-max-content">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "v-todo-update-form",
    props: ['todo_id'],
    data(){
        return{
            msg: '',
            form: {
                title: null,
                description: null,
                priority: null,
            }
        }
    },
    mounted() {
        this.getTodo()
    },
    methods: {
        getTodo(){
           this.$store.dispatch("todo/GET", `?id=${this.todo_id}`).then(data => {
               console.log(data)
               if(data.success){
                   this.form = data.obj
               }

           })
        },
        onTodo(e){
            e.preventDefault()
            if(this.form.title.length < 1)
                return this.msg = 'minimum title length 1 character'
            if(this.form.description.length < 1)
                return this.msg = 'minimum description length 1 character'
            this.$store.dispatch("todo/PUT", {id: this.todo_id, form: this.form}).then(data => {
                if(!data.success)
                    this.msg = data.obj.msg
                else
                    location.reload()
            })
        }
    }
}
</script>

<style scoped>

</style>