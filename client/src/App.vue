<script>
// TODO: Allow the user to retry with a new text
import MainLayout from "./layout/MainLayout.vue";

// import pages
import Typing from './pages/Typing.vue'
import Profile from './pages/Profile.vue'
import Leaderboard from './pages/Leaderboard.vue'
import NotFound from './pages/NotFound.vue'

const routes = {
    '/': Typing,
    '/leaderboard': Leaderboard,
    '/profile': Profile
}

export default {
    components: {
        MainLayout,
    },
    data() {
        return {
            currentPath: window.location.hash,
        };
    },
    computed: {
        currentPage() { 
            console.log(window.location.hash)
            return routes[this.currentPath.slice(1) || '/'] || NotFound
        },
    },
    mounted() { 
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.hash
        })
    },
};
</script>

<template>
    <MainLayout>
        <component :is="currentPage" />
    </MainLayout>
</template>
