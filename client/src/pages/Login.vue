<script>
import { ref } from "vue";
import userState from "@/states/accountState.js";
import { postLogin } from "@/helpers/requests.js";

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
            this.processing = true;

            postLogin(this.username, this.password)
                .then((res) => {
                    userState.fromToken(res.data);

                    setTimeout(() => {
                        window.location.hash = "#/";
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
            <q-btn label="log in" type="submit" color="primary" :disable="processing" />
            <span v-show="error !== null">{{ error }}</span>
        </q-form>
    </div>
</template>
