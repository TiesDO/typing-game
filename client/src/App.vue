<script>
// TODO: Allow the user to retry with a new text
import MainLayout from "./layout/MainLayout.vue";
import { userState } from './components/states.js'

// import pages
import Typing from './pages/Typing.vue'
import Profile from './pages/Profile.vue'
import Leaderboard from './pages/Leaderboard.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import NotFound from './pages/NotFound.vue'

const routes = {
    '/': Typing,
    '/leaderboard': Leaderboard,
    '/profile': Profile,
    '/login': Login,
    '/register': Register,
}

export default {
    components: {
        MainLayout,
        userState,
    },
    data() {
        return {
            currentPath: window.location.hash,
        };
    },
    computed: {
        currentPage() { 
            return routes[this.currentPath.slice(1) || '/'] || NotFound
        },
        profileLabel() {
            if (userState.token === '') {
                return 'Login/Register'
            } else {
                return userState.username
            }
        }
    },
    watch: {
        userState() {
            
        }
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
