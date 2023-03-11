<script>
// TODO: Update layout
// - Tab Result
//   - show donut, cpm, wpm and time
// - Tab heatmap, heatmap of keys pressed and them being correct
// - Tab char, show typing and score progression

import { ref } from "vue";
import VueApexChart from "vue3-apexcharts";

const chartData = {
    series: [44, 3],
    chartOptions: {
        labels: ["right", "wrong"],
    },
};

export default {
    setup() {
        return {
            statTab: ref("result"),
        };
    },
    data() {
        return {
            chartData,
        };
    },
    components: {
        apexchart: VueApexChart,
    },
};
</script>

<template>
        <q-tabs v-model="statTab" 
            align="justify"
            dense
            narrow-indicator
            class="text-grey"
            active-color="primary"> 
            <q-tab name="result" label="Result" />
            <q-tab name="heatmap" label="Key accuracy" />
            <q-tab name="chart" label="Typing Score" />
        </q-tabs>

        <q-tab-panels v-model="statTab">
            <q-tab-panel name="result"> 
                <apexchart type="donut" :options="chartData.chartOptions" width="300" height="auto"
                    :series="chartData.series" />
            </q-tab-panel>
            <q-tab-panel name="heatmap" label="KeyStrokes"></q-tab-panel>
        </q-tab-panels>
</template>

<style scope></style>
