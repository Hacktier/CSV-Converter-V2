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

            <input v-model="managerID" type="radio"  :value=false class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio2">aus</label>
          </div>
        </div>
        <div class="input-group mt-4">
          <span class="input-group-text" id="inputGroup-sizing-default">OG Nummer</span>
          <input v-model="clubNumber" type="text" class="form-control" aria-label="Sizing example input"
                 aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="float-end">
          <button class="mt-4 btn btn-primary" @click="save">
            Speichern
          </button>
        </div>


        <footer class="row">
          <div class="col ms-4 p-0">Version 2.0.0</div>
          <div class="col copyright p-0 me-4">&copy; Markus Kapp</div>
        </footer>
      </q-list>
      <footer class="row p-2">
        <div class="col">
          Version 2.0.0
        </div>
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

const managerID = ref<boolean>(true);
const clubNumber = ref<number>(1321012);
const DrawerOpen = ref(false);

function save() {
  localStorage.setItem("managerID", JSON.stringify(managerID.value));
  localStorage.setItem("clubNumber", JSON.stringify(clubNumber.value));
}

function toggleDrawer() {
  DrawerOpen.value = !DrawerOpen.value;
}
</script>
