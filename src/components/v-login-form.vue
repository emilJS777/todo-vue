<template>
    <div class="bg-ccc-opacity p-fixed left-0 top-0 w-max h-max d-flex j-content-center a-items-center">
        <form class="w-max-content bg-fff d-grid g-gap-1 padding-2 box-shadow-slim h-max-content p-relative" @submit="onLogin" style="width: 400px;">
            <span class="p-absolute right-0 top-0 m-top-1 m-right-1 padding-03 c-pointer c-content-hover" @click="this.$emit('close')">Close</span>
            <p v-if="msg" class="c-red">{{this.msg}}</p>
            <div class="d-grid g-gap-_3">
                <label for="">Username</label>
                <input type="text" v-model="form.name" class="form-standard">
            </div>
            <div class="d-grid g-gap-_3">
                <label for="">Password</label>
                <input type="password" v-model="form.password" class="form-standard">
            </div>
            <div class="d-flex g-gap-_3">
                <button   class="form-standard c-pointer m-top-05 w-max-content">Login</button>
            </div>

        </form>
    </div>
</template>

<script>
export default {
    name: "v-login-form",
    data(){
      return{
          msg: '',
          form: {
              name: '',
              password: ''
          }
      }
    },
    methods: {
        onLogin(e){
            e.preventDefault()
            this.$store.dispatch("auth/LOGIN", this.form).then(data => {
                if(!data.success)
                    this.msg = data.obj.msg
            })
        }
    }
}
</script>

<style scoped>

</style>