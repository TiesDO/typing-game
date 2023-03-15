<script>
import { ref } from "vue";
import userState from "@/states/accountState.js";
import { postRegister } from "@/helpers/requests";

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

            postRegister(this.username, this.password)
                .then(() => {
                    userState.username = this.username;

                    setTimeout(() => {
                        window.location.hash = "#/login";
                    }, 1000);
                })
                .catch((err) => {
                    console.error(err);
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
