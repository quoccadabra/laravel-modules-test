<template>
    <div>
        <!-- <Sidebar></Sidebar> -->
    </div>
    <router-view>
    </router-view>
</template>
<script>
import { mapState } from 'vuex';
import Sidebar from '../partials/sidebar.vue';
export default {
    components: Sidebar,
    // setup () {
    //   const toast = () => {
    //       createToast(CustomizedContent)
    //   }
    //   return { toast }
    // }
}

</script>