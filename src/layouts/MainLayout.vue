<template>
  <q-layout view="lHh Lpr lFf">
    <!--    <q-header elevated>-->
    <!--      <q-toolbar>-->
    <!--        <q-btn style="width:30px"-->
    <!--          flat-->
    <!--          unelevated-->
    <!--          icon="menu"-->
    <!--          size="m"-->
    <!--          aria-label="Menu"-->
    <!--          @click="toggleLeftDrawer"-->
    <!--        />-->

    <!--        <div>Quasar v{{ $q.version }}</div>-->
    <!--      </q-toolbar>-->
    <!--    </q-header>-->

    <!--    <q-drawer-->
    <!--      v-model="leftDrawerOpen"-->
    <!--      bordered-->
    <!--    >-->
    <!--      <q-list>-->
    <!--        <h2 class="m-2">Einstellungen</h2>-->
    <!--      </q-list>-->
    <!--    </q-drawer>-->


    <q-btn class="position-absolute end-0 settingsButton"
           flat
           unelevated
           icon="settings"
           size="m"
           aria-label="Menu"
           @click="toggleDrawer"
    />

    <q-drawer class="position-absolute end-0"
              v-model="DrawerOpen"
              side="right"
              elevated
              bordered
    >
      <q-list>
        <h2 class="m-2">Einstellungen</h2>
<!--        <q-btn style="width:30px" class="position-absolute top-0 end-0"-->
<!--               flat-->
<!--               unelevated-->
<!--               icon="settings"-->
<!--               size="m"-->
<!--               aria-label="Menu"-->
<!--               @click="toggleDrawer"-->
<!--        />-->
      </q-list>
      <footer class="row p-2">
        <div class="col">
          Version 2.0.0
        </div>
        <a href="https://github.com/Hacktier" target="_blank"  class="col copyright">
            &copy; Markus Kapp
        </a>
      </footer>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const DrawerOpen = ref(false)

function toggleDrawer() {
  DrawerOpen.value = !DrawerOpen.value
}
</script>
