<template>
    <div class="bg-ccc-opacity p-fixed left-0 top-0 w-max h-max d-flex j-content-center a-items-center">
        <form class="w-max-content bg-fff d-grid g-gap-1 padding-2 box-shadow-slim h-max-content p-relative" @submit="onRegistration" style="width: 400px;">
            <span class="p-absolute right-0 top-0 m-top-1 m-right-1 padding-03 c-pointer c-content-hover" @click="this.$emit('close')">Close</span>
            <p v-if="msg" class="c-red">{{this.msg}}</p>
            <div class="d-grid g-gap-_3">
                <label for="">Username</label>
                <input type="text" v-model="form.name" class="form-standard">
            </div>
            <div class="d-grid g-gap-_3">
                <label for="">First name</label>
                <input type="text" v-model="form.first_name" class="form-standard">
            </div>
            <div class="d-grid g-gap-_3">
                <label for="">Last name</label>
                <input type="text" v-model="form.last_name" class="form-standard">
            </div>
            <div class="d-grid g-gap-_3">
                <label for="">Password</label>
                <input type="password" v-model="form.password" class="form-standard">
            </div>
            <div class="d-grid g-gap-_3">
                <label for="">Confirm password</label>
                <input type="password" v-model="form.confirmPassword" class="form-standard">
            </div>
            <div class="d-flex g-gap-_3">
                <button class="form-standard c-pointer m-top-05 w-max-content">Registration</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "v-registration-form",
    data(){
      return{
          msg: '',
          form: {
              name: '',
              password: '',
              confirmPassword: '',
              first_name: '',
              last_name: '',
          }
      }
    },
    methods: {
        onRegistration(e){
            e.preventDefault()
            if(this.form.name.length < 3)
                return this.msg = 'minimum username length 3 character'
            if(this.form.first_name.length < 3)
                return this.msg = 'minimum first name length 3 character'
            if(this.form.name.length < 3)
                return this.msg = 'minimum last name length 3 character'
            if(this.form.password.length < 3)
                return this.msg = 'minimum description length 3 character'
            if(this.form.password === this.form.confirmPassword){
                this.$store.dispatch("user/POST", this.form).then(data => {
                    if(data.success){
                        this.$emit('toggle')
                    }
                    else
                        this.msg = data.obj.msg
                })
            }
            else
                this.msg = 'Password mismatch'
        }
    }
}
</script>

<style scoped>

</style>