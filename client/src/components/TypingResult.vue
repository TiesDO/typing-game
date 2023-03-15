<script>
import { getCssVar } from "quasar";

import { ref } from "vue";
import VueApexChart from "vue3-apexcharts";

export default {
    setup() {
        return {
            statTab: ref("result"),
        };
    },
    props: {
        cpm: { type: Number, default: 0 },
        wpm: { type: Number, default: 0 },
        correctCpm: { type: Number, default: 0 },
        timeElapsed: { type: Number, default: 0 },
        finalMistakes: { type: Number, default: 0 },
        totalMistakes: { type: Number, defualt: 0 },
        totalWords: { type: Number, default: 0 },
        totalCharacters: { type: Number, default: 0 },
    },
    data() {
        return {
            series: [this.totalCharacters, this.totalMistakes],
            chartOptions: {
                colors: [getCssVar('primary'), getCssVar('negative')],
                labels: ["correct", "wrong"],
                dataLabels: { enabled: false },
                legend: { show: false },
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        donut: {
                            size: 60,
                            labels: {
                                show: true,
                                name: { show: true },
                                total: { show: true, showAlways: true, label: "Keystrokes" },
                            },
                        },
                    },
                },
            },
        };
    },
    methods: {
        chartData() {
            return [this.totalCharacters, this.totalMistakes];
        },
    },
    components: {
        apexchart: VueApexChart,
    },
};
</script>

<template>
    <q-tabs v-model="statTab" align="justify" dense narrow-indicator class="text-grey" active-color="primary">
        <q-tab name="result" label="Result" />
        <q-tab name="heatmap" label="Key accuracy" />
        <q-tab name="chart" label="Typing Score" />
    </q-tabs>

    <!--
        TODO: integrate the avg diff of last 10 resutls
    -->

    <q-tab-panels v-model="statTab">
        <q-tab-panel name="result">
            <div class="row q-pt-md">
                <div class="col q-pa-md">
                <apexchart type="donut" :options="chartOptions" width="100%" height="auto" :series="series" />
                </div>
                <div class="col text-h6 q-my-auto">
                    <div class="row text-bold">Score overview</div>
                    <div class="row">
                        <div class="col-3 text-grey-7">wpm</div>
                        <div class="col-5 text-bold text-primary">{{ Math.round(wpm) }}</div>
                        <div class="col-4">+avg</div>
                    </div>
                    <div class="row">
                        <div class="col-3 text-grey-7">cpm</div>
                        <div class="col-5 text-bold text-primary">{{ Math.round(cpm) }}</div>
                        <div class="col-4">+avg</div>
                    </div>
                    <div class="row">
                        <div class="col-3 text-grey-7">time</div>
                        <div class="col-5 text-bold text-primary">{{ timeElapsed / 1000 }} s</div>
                        <div class="col-4">+avg</div>
                    </div>
                </div>
            </div>
        </q-tab-panel>
        <q-tab-panel name="heatmap">
            <!--
                TODO: Create keystroke heatmap
            -->
        </q-tab-panel>
        <q-tab-panel name="chart">
            <!-- 
                TODO: Show actions affect on score over time
            -->
        </q-tab-panel>
    </q-tab-panels>
</template>

<style scope></style>
