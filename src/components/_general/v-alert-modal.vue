<template>
    <div class="modal d-flex a-items-center j-content-center">
        <div class="modal-content w-max-content h-max-content">
            <i>{{ label }}</i>

            <div class="m-top-1 d-flex j-content-center g-gap-1">
                <button  @click="this.$emit('confirm')" class="bg-content form-standard c-pointer">Confirm</button>
                <button  @click="this.$emit('close')" class="form-standard c-pointer">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: "v-alert-modal",
    components: {},
    props: ['label'],
    computed: mapState({
        lang: state => state.lang.LANG
    }),
}
</script>

<style scoped>

</style>