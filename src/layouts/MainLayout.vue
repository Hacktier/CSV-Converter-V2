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
      <q-list class="m-2">
        <h2>Einstellungen</h2>
        <!--        <q-btn style="width:30px" class="position-absolute top-0 end-0"-->
        <!--               flat-->
        <!--               unelevated-->
        <!--               icon="settings"-->
        <!--               size="m"-->
        <!--               aria-label="Menu"-->
        <!--               @click="toggleDrawer"-->
        <!--        />-->


        <div class="form-check form-switch m-2 mt-4">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
          <label class="form-check-label" for="flexSwitchCheckChecked">DLRG-Manager ID</label>
        </div>
        <div class="input-group mt-4">
          <span class="input-group-text" id="inputGroup-sizing-default">OG Nummer</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>

        <footer class="row">
          <div class="col ms-4 p-0">Version 2.0.0</div>
          <div class="col copyright p-0 me-4">&copy; Markus Kapp </div>
        </footer>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import EssentialLink, {EssentialLinkProps} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

const DrawerOpen = ref(false)

function toggleDrawer() {
  DrawerOpen.value = !DrawerOpen.value
}
</script>
