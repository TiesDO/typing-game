<script>
import { userState } from '../components/states.js'

export default {
    methods: {
        setNav(target) {
            window.location.hash = `#/${target}`
        }
    },
    computed: {
        profileLabel() {
            if (userState.token === '') {
                return 'Login/Register'
            } else {
                return userState.username
            }
        }
    }
}

</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white">
            <div class="row no-wrap">
                <q-toolbar>
                    <q-toolbar-title> Typing Test </q-toolbar-title>
                </q-toolbar>
                <q-toolbar>
                    <q-space />
                    <q-separator dark vertical />
                    <q-btn stretch flat label="Play" @click="setNav('')"/>
                    <q-separator dark vertical />
                    <q-btn stretch flat label="Leaderboard" @click="setNav('leaderboard')"/>
                    <q-separator dark vertical />
                    <q-btn stretch flat :label="profileLabel" @click="setNav('profile')"/>
                </q-toolbar>
            </div>
        </q-header>

        <q-page-container class="relative-position window-height">
            <slot />
        </q-page-container>
    </q-layout>
</template>
