<template>
  <div class="center">
    <div class="input-wrapper">
      <input class="form-control scaleInput" ref="fileInput" type="file" @change="handleFileChange" id="input"/>
      <div>
        <button class="btn btn-primary ms-2" @click="convert">Convert</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'
import Papa from 'papaparse'
import {Member} from "src/Member";
import readXlsxFile from "read-excel-file";
import dayjs from 'dayjs';

const fileInput = ref<HTMLInputElement>()
const file = ref<File | null>()
let members: Member[] = [];

function handleFileChange() {
  file.value = fileInput.value?.files?.item(0)
}

async function convert(): Promise<void> {
  if (!file.value) {
    return
  }


  readXLSX();
}

async function writeNewCSV(): Promise<void> {
  const writeManagerID = localStorage.getItem('managerID');
  const clubNumber = localStorage.getItem('clubNumber');

  const data = members.map(member => ({
    /**
     * * DLRG Manager:              DLRG Seminare
     *  Frauen = 1 / neu: Frau       = 1
     *  Männer = 2 / neu: Herr       = 0
     */

    'DLRG-Manager-Id': writeManagerID ? member['managerId'] : '',
    'Mitgliedsausweisnummer': '',
    'Vorname': member["firstname"],
    'Nachname': member["lastname"],
    'Geburtsdatum': dayjs(member['birthDate']).format('DD.MM.YYYY').toString(),
    'Geschlecht': member["gender"] == 'Herr' ? '0' : '1',
    'Strasse': member["street"],
    'PLZ': member["zipCode"],
    'Wohnort': member["city"],
    'E-Mail': member["email"],
    'Telefon privat': member["phoneNumber1"],
    'Telefon mobil': member["phoneNumber3"] ? member["phoneNumber3"] : member["phoneNumber2"],
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
    const fileHandle = await directoryHandle.getFileHandle("import_" + i + ".csv", {create: true});
    const writableStream = await fileHandle.createWritable();

    await writableStream.write(files[i]);
    await writableStream.close();
  }
  alert('Gespeichert!');
  members = []
}

function readXLSX() {
  if (!file.value) {
    return;
  }

  const map = {
    'Nr': 'number',
    'Anrede': 'salutation',
    'Vorname': 'firstname',
    'Nachname': 'lastName',
    'Strasse': 'street',
    'PLZ': 'zipcode',
    'Ort': 'city',
    'Telefon1': 'phone1',
    'Telefon2': 'phone2',
    'Mobil': 'phone3',
    'Email': 'email',
    'Geburtsdatum': 'birthDate',

  }

  readXlsxFile(file.value, {map}).then(file => {
    file.rows.forEach((row: object, index: number, all: object[]) => {
      members.push({
        managerId: row['number'],
        firstname: row['firstname'],
        lastname: row['lastName'],
        birthDate: row['birthDate'],
        gender: row['salutation'],
        street: row['street'],
        zipCode: row['zipcode'],
        city: row['city'],
        email: row['email'],
        phoneNumber1: row['phone1'],
        phoneNumber2: row['phone2'],
        phoneNumber3: row['phone3'],
      });
    });

    writeNewCSV();
  })


}


</script>
