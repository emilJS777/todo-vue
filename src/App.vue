<template>
    <v-header></v-header>
    <div>
           <router-view></router-view>
    </div>
</template>

<script>

import VHeader from "@/components/v-header.vue";

export default {
    name: 'App',
    components: {VHeader},
}
</script>

<style src="@/assets/main.css">

</style>