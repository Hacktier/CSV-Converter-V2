<template>
  <div class="fileInput position-absolute top-50 start-50 translate-middle row">
    <input class="form-control col-9" ref="fileInput" type="file" @change="handleFileChange"/>
    <div class="col-3">
      <button class="btn btn-primary  ms-2" @click="convert">Convert</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'
import Papa from 'papaparse'
import {Member} from "src/Member";
import {exportFile, runSequentialPromises} from "quasar";

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


async function writeNewCSV() {


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
    'Geschlecht': member["gender"] == 1 ? member["gender"] : 0,
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


  const fileCount = Math.ceil(data.length / 99);
  const files = [];

  for (let i = 0; i < fileCount; i++) {
    const chunk = data.slice(i * 99, (i + 1) * 99)

    files.push(Papa.unparse(chunk, {
      delimiter: ";",
    }));
  }

  for (let i = 0; i < files.length; i++) {
   saveFile(files[i])
  }

}

function saveFile(file: string) {
  let datetime = new Date();

  exportFile(
      'import ' + datetime.toLocaleDateString() + '_' + datetime.toLocaleTimeString('id') + '.csv',
      file
  );
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
