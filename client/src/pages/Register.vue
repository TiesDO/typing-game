<script>
import { ref } from "vue";
import { userState } from "../components/states.js";

export default {
    data() {
        return {
            processing: ref(false),
            username: ref(""),
            password: ref(""),
            error: ref(null),
        };
    },
    methods: {
        onSubmit() {
            this.processing = true;

            fetch("http://127.0.0.1:3000/account/register", {
                method: "POST",
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "SUCCESS") {
                        userState.username = this.username;

                        // redirect automatically to login page
                        setTimeout(() => {
                            window.location.hash = "#/login";
                        }, 1000);
                    } else {
                        this.error = data.message;
                    }
                })
                .finally(() => {
                    this.processing = false;
                });
        },
    },
};
</script>

<template>
    <div class="flex flex-center">
        <q-form @submit="onSubmit">
            <q-input filled v-model="username" label="Username" />
            <q-input filled v-model="password" label="Password" />
            <q-btn label="register" type="submit" color="primary" :disable="processing" />
            <span v-show="error !== null">{{ error }}</span>
        </q-form>
    </div>
</template>
