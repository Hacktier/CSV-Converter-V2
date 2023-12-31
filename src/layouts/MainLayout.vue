<template xmlns="http://www.w3.org/1999/html">
  <q-layout view="lHh Lpr lFf">

    <q-btn class="position-absolute end-0 settingsButton m-3"
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
      <q-list class="m-3">

        <h2><b>Einstellungen</b></h2>
        <div class="d-flex mt-4">
          <span class="input-group-text">DLRG Manager ID:</span>
          <!--          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">-->
          <div class="btn-group ms-2" role="group" aria-label="Basic radio toggle button group">

            <input v-model="managerID" :value=true type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
            <label class="btn btn-outline-primary" for="btnradio1">an</label>

            <input v-model="managerID" type="radio" :value=false class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio2">aus</label>
          </div>
        </div>
        <div class="input-group mt-4">
          <span class="input-group-text" id="inputGroup-sizing-default">OG Nummer</span>
          <input v-model="clubNumber" type="text" class="form-control" aria-label="Sizing example input"
                 aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="float-end">
          <button class="mt-4 btn btn-primary" @click="save" id="liveToastBtn">
            Speichern
          </button>
        </div>
      </q-list>
      <footer class="p-2">
        <div class="">Version 2.0.0</div>
        <a href="https://github.com/Hacktier" target="_blank" class="col copyright">
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
import { useStore } from 'vuex';

const store = useStore();
const DrawerOpen = ref(false);
const managerID = ref<boolean>(store.state.managerID ?? true);
const clubNumber = ref<number>(
  store.state.clubNumber !== undefined && store.state.clubNumber !== null && store.state.clubNumber !== ''
    ? Number(store.state.clubNumber)
    : 1321012
);

function save() {
  store.commit('setClubNumber', clubNumber.value);
  store.commit('setManagerID', managerID.value);

  alert("Gespeichert!")
}

function toggleDrawer() {
  DrawerOpen.value = !DrawerOpen.value;
}

</script>
