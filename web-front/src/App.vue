<template>
    <MainLayout>
        <TextDisplay @onFinished="displayMessage"/>
    </MainLayout>
</template>

<script>
import TextDisplay from "./components/TextDisplay.vue";
import MainLayout from "./layout/MainLayout.vue";

export default {
    components: {
        MainLayout,
        TextDisplay,
    },
    methods: {
        displayMessage() {
            alert('good job')
        }
    }
};
</script>
