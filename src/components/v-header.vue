<template>
  <div class="header d-flex j-content-space-between box-shadow-slim padding-1 bg-fff a-items-center">
    <h1 class="m-left-1">Todo <span class="c-content">List</span></h1>

     <div class="authBlock m-right-2 d-flex g-gap-1 a-items-center j-content-center" v-if="!profile">
         <button class="form-standard c-pointer bg-content-hover t-center" @click="modal = 'login'">Login</button>
         <button class="form-standard bg-content c-pointer"  @click="modal = 'registration'">Registration</button>
     </div>
      <div  class="authBlock m-right-2 d-flex g-gap-1 a-items-center j-content-center" v-else>
          <div>
              <div>
                  {{this.profile.first_name}}
              </div>
              <div>
                  {{this.profile.last_name}}
              </div>
          </div>
          <button class="form-standard c-pointer bg-content-hover" @click="modal='logoutAlert'">
              <i class="fa fa-sign-out" aria-hidden="true"></i>
              Logout
          </button>
      </div>
  </div>

    <v-alert-modal label="do you want to log out of your account?" @confirm="logout" @close="modal=''" v-if="modal==='logoutAlert'"/>
    <v-registration-form class="animation-from-hidden" @close="modal = ''" v-if="modal === 'registration'" @toggle="modal='login'"/>
    <v-login-form class="animation-from-hidden" @close="modal = ''" v-if="modal === 'login'"/>
</template>

<script>
import {mapState} from "vuex";
import VLoginForm from "@/components/v-login-form.vue";
import VRegistrationForm from "@/components/v-registration-form.vue";
import VAlertModal from "@/components/_general/v-alert-modal.vue";

export default {
    name: "v-header",
    components: {VAlertModal, VRegistrationForm, VLoginForm},
    computed: mapState({
        profile: state => state.auth.profile
    }),
    data(){
        return{
            modal: ''
        }
    },
    methods: {
        logout(){
            localStorage.clear("accress_token")
            location.reload()
        }
    }
}
</script>

<style scoped>

</style>