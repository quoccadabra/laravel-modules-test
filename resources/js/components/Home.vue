<template>
    <nav></nav>
    <div>
        <!-- <h2>Home</h2> -->
        <div>
            <Navigation></Navigation>
        </div>
        <div class="row">
            <div class="col-md-3">
                <sidebar></sidebar>
            </div>
            <div class="col-md-9">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';
import sidebar from '../partials/sidebar.vue';
import Navigation from '../partials/nav.vue';
import Cookie from 'js-cookie';
export default {
    components: {
        sidebar,
        Navigation
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['authUser']),
    },
    created() {
        console.log('Welcome to Home Component');
    }
}
</script>

<style scoped>
</style>