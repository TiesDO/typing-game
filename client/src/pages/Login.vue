<script>
import { ref } from "vue";
import { userState } from "../components/states.js";

export default {
    data() {
        return {
            username: ref(""),
            password: ref(""),
            error: ref(""),
            processing: ref(false),
        };
    },
    mounted() {
        if (userState.username !== "") {
            this.username = userState.username;
        }
    },
    methods: {
        onSubmit() {
            this.processing = true

            // TODO: Make login request
            fetch("http://127.0.0.1:3000/account/login", {
                method: "POST",
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "SUCCESS") {
                        userState.fromToken(data.data);
                    } else {
                        this.error = data.error
                    }
                }).finally(() => { this.processing = false })
        },
    },
};
</script>

<template>
    <div class="flex flex-center">
        <q-form @submit="onSubmit">
            <q-input filled v-model="username" label="Username" />
            <q-input filled v-model="password" label="Password" />
            <q-btn label="log in" type="submit" color="primary" :disable="processing" />
        </q-form>
    </div>
</template>
