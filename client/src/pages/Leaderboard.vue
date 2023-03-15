<script> 
import userState from '@/states/accountState.js'
import { getLeaderboard } from '@/helpers/requests.js'
import { ref } from 'vue'

export default {
    data() {
        return {
            userState,
            isLoading: ref(false),
            entries: ref([]),
            pagination: { page: 1, rowsPerPage: 0},
            cols: [
                {name: 'username', label: 'Username', requried: true, sortable: false, field: row => row.username, align: 'left'},
                {name: 'cpm', label: 'Cpm (characters per minut)', requried: true, sortable: false, field: row => row.cpm, align: 'left'},
                {name: 'wpm', label: 'Wpm (Words per minut)', requried: true, sortable: false, field: row => row.wpm, align: 'left'},
                {name: 'time', label: 'Time (in seconds)', requried: true, sortable: false, field: row => row.time, align: 'left'},
            ]
        }
    },
    mounted() {
        this.isLoading = true
        getLeaderboard()
            .then(res => {
                let sorted = res.data.sort((a,b) => {
                    if (a.cpm < b.cpm) {
                        return 1
                    } else if (a.cpm > b.cpm) {
                        return -1
                    } else {
                        return 0
                    }
                });

                console.log(sorted)
                this.entries = sorted
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                this.isLoading = false;
            })
    }
}
</script>

<template>
    <q-table
        :rows="entries"
        row-key="username" 
        hide-bottom 
        :columns="cols"
        :pagination="pagination"/>
</template>
