<template>
    <MainLayout>
        <TextDisplay />
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
};
</script>
