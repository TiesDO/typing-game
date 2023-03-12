import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.use(Quasar, quasarUserOptions).mount("#app");
app.use(VueApexCharts);
