<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-toolbar-title>
                    Typing Test
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container class="relative-position window-height">
            <slot />
        </q-page-container>
    </q-layout>
</template>
