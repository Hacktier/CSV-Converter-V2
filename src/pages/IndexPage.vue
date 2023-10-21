<template>
  <div class="fileInput position-absolute top-50 start-50 translate-middle row">
    <input class="form-control col-9" ref="fileInput" type="file" @change="handleFileChange" id="input"/>
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
import readXlsxFile from "read-excel-file";
import {Cell} from "read-excel-file/types";

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

  readXLSX();
}


async function writeNewCSV() {
  console.log(members)

  const data = members.map(member => {
    try {
      return {
        'DLRG-Manager-Id': "",
        // ... (Rest des Codes)
      };
    } catch (error) {
      console.error("Error in mapping:", error)
    };


      /**
     * * DLRG Manager:        DLRG Seminare
     *  Frauen = 1          = 1
     *  Männer = 2          = 0
     */

    // 'DLRG-Manager-Id': "",
    // 'Mitgliedsausweisnummer': "",
    // 'Vorname': member["firstname"],
    // 'Nachname': member["lastname"],
    // 'Geburtsdatum': member["birthDate"],
    // 'Geschlecht': member["gender"] === '1' ? member["gender"] : '0',
    // 'Strasse': member["street"],
    // 'PLZ': member["zipCode"],
    // 'Wohnort': member["city"],
    // 'E-Mail': member["email"],
    // 'Telefon privat': member["phoneNumber"],
    // 'Telefon mobil': member["phoneNumber"],
    // 'Mitgliedschaft (EDVNummer)': '1321012',
    // 'ID UVT': "",
    // 'Name Unternehmen': "",
    // 'PLZ Unternehmen': "",
    // 'Ort Unternehmen': "",
    // 'Strasse Unternehmen': "",
    // 'Mitgliedsnummer Unternehmen': ""
  });

  console.log(data)

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

function readXLSX() {
  if (!file.value) {
    console.log('Nop input');
    return;
  }

  readXlsxFile(file.value).then(rows => {
    rows.forEach((row : Cell[]) => {
      if (row[0] === 'Nummer') {
        return;
      }


      members.push({
        managerId: row[0] ? row[0].toString() : '',
        firstname: row[2] ? row[2].toString() : '',
        lastname: row[3] ? row[3].toString() : '',
        birthDate: row[9] ? row[9].toString() : '',
        gender: row[1] ? row[1].toString() : '',
        street: row[4] ? row[4].toString() : '',
        zipCode: row[5] ? row[5].toString() : '',
        city: row[6] ? row[6].toString() : '',
        email: row[11] ? row[11].toString() : '',
        phoneNumber: row[7] ? row[7].toString() : '',
        phoneNumberExtra: row[8] ? row[8].toString() : '',
      });

    })
  })

  writeNewCSV();

}


</script>
