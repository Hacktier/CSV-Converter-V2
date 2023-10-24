<template>
  <div class="center">
    <input class="form-control scaleInput" ref="fileInput" type="file" @change="handleFileChange" id="input"/>
    <div>
      <button class="btn btn-primary ms-2" @click="convert">Convert</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'
import Papa from 'papaparse'
import {Member} from "src/Member";
import {exportFile} from "quasar";
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
  const writeManagerID = localStorage.getItem('managerID');
  const clubNumber = localStorage.getItem('clubNumber');

  const data = members.map(member => ({
    /**
     * * DLRG Manager:        DLRG Seminare
     *  Frauen = 1          = 1
     *  Männer = 2          = 0
     */

    'DLRG-Manager-Id': "",
    'Mitgliedsausweisnummer': writeManagerID ? member['managerId'] : '',
    'Vorname': member["firstname"],
    'Nachname': member["lastname"],
    'Geburtsdatum': member["birthDate"],
    'Geschlecht': member["gender"] == '1' ? member["gender"] : '0',
    'Strasse': member["street"],
    'PLZ': member["zipCode"],
    'Wohnort': member["city"],
    'E-Mail': member["email"],
    'Telefon privat': member["phoneNumber"],
    'Telefon mobil': member["phoneNumber"],
    'Mitgliedschaft (EDVNummer)': clubNumber ? clubNumber : '',
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

  const directoryHandle = await window.showDirectoryPicker({id: 'directoryPicker'});

  for (let i = 0; i < files.length; i++) {
    const fileHandle = await directoryHandle.getFileHandle("import_" + i + ".csv", { create: true });
    const writableStream = await fileHandle.createWritable();

    await writableStream.write(files[i]);
    await writableStream.close();
  }
}

function readXLSX() {
  if (!file.value) {
    return;
  }

  readXlsxFile(file.value).then(rows => {
    rows.forEach((row: Cell[]) => {
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
    writeNewCSV();
  })


}


</script>
