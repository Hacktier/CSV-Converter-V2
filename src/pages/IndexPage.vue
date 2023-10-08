<template>
  <q-page class="row items-center justify-evenly">
    <input ref="fileInput" type="file" @change="handleFileChange"/>
    <button @click="convert">Convert</button>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Papa from 'papaparse'
import {Member} from "src/Member";

const fileInput = ref<HTMLInputElement>()
const file = ref<File | null>()
let members: Member[] = [];

function handleFileChange() {
  file.value = fileInput.value?.files?.item(0)
}

async function convert() {
  if (!file.value) {
    return
  }

  readCSV();
}


function writeNewCSV() {


  const data = members.map(member => ({
    /**
     * * DLRG Manager:        DLRG Seminare
     *  Frauen = 1          = 1
     *  Männer = 2          = 0
     */

    'DLRG-Manager-Id': "",
    'Mitgliedsausweisnummer': "",
    'Vorname': member["firstname"],
    'Nachname': member["lastname"],
    'Geburtsdatum': member["birthDate"],
    'Geschlecht': member["gender"]== 1 ? member["gender"] : 0,
    'Strasse': member["street"],
    'PLZ': member["zipCode"],
    'Wohnort': member["city"],
    'E-Mail': member["email"],
    'Telefon privat': member["phoneNumber"],
    'Telefon mobil': member["phoneNumber"],
    'Mitgliedschaft (EDVNummer)': member["membership"],
    'ID UVT': "",
    'Name Unternehmen': "",
    'PLZ Unternehmen': "",
    'Ort Unternehmen': "",
    'Strasse Unternehmen': "",
    'Mitgliedsnummer Unternehmen': ""

  }));


  const fileCount = Math.ceil(data.length / 100);

  const first = data.slice(0, 98);

  console.log(fileCount)

  const newCSV = Papa.unparse(first, {
    delimiter: ";",
  });

  download(newCSV)
}

function download(newCSV: string) {
  let filename = 'test.csv';
  let element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(newCSV));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);

  file.value = null;
}

function readCSV() {
  const reader = new FileReader();

  reader.onload = () => {
    Papa.parse(reader.result, {
      header: false,
      dynamicTyping: true,
      skipEmptyLines: true,
      step: function (results: { data: any; errors: any; }, parser: any) {

        if (results.data[0] == "Nummer") {
          return
        }

        members.push({
          managerId: results.data[0],
          firstname: results.data[2],
          lastname: results.data[3],
          birthDate: results.data[9],
          gender: results.data[1],
          street: results.data[4],
          zipCode: results.data[5],
          city: results.data[6],
          email: results.data[11],
          phoneNumber: results.data[7],
          phoneNumberExtra: results.data[8],
          membership: 1321012
        });

        if (results.errors.length !== 0) {
          console.log("Row errors:", results.errors);
        }
      }
    });

    writeNewCSV();

  };


  if (file.value) {
    reader.readAsText(file.value);
  }
}

</script>


