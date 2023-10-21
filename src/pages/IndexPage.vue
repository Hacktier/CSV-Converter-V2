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
import {saveAs} from "file-saver";

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


  // let promises = [];

  // urls.forEach(function (e) {
  //   fetch(e.download)
  //       .then(res => res.blob())
  //       .then(blob => {
  //         saveAs(blob, e.filename);
  //       });
  // });


  const a = await window.showDirectoryPicker({id: 'blub'});

  for (let i = 0; i < files.length; i++) {
    // promises.push((files: (string | Blob | ArrayBuffer | ArrayBufferView)[]) => new Promise((resolve, reject) => {
    const b = await a.getFileHandle("bru_" + i + ".csv", { create: true });

    console.log(b);

    const writableStream = await b.createWritable();

    // write our file
    await writableStream.write(files[i]);

    // close the file and write the contents to disk.
    await writableStream.close();


    console.log(a);

    let datetime = new Date();
    // saveAs(files[i], "blobi.txt");
    // console.log("before");
    //   exportFile(
    //       'import ' + datetime.toLocaleDateString() + '_' + datetime.toLocaleTimeString('id') + '.csv',
    //       files[i]
    //   );
    //   console.log("after");
    // }));

  }

  // await runSequentialPromises([promises.map])
  //     .then(resultAggregator => {
  //
  //     })
  //     .catch(errResult => {
  //       console.error(`Error encountered on job #${errResult.key}:`)
  //       console.error(errResult.reason)
  //       console.log('Managed to get these results before this error:')
  //       console.log(errResult.resultAggregator)
  //     })

}

function saveFile(file: string) {
  let datetime = new Date();
  exportFile(
      'import ' + datetime.toLocaleDateString() + '_' + datetime.toLocaleTimeString('id') + '.csv',
      file
  );


  // const openFileFromSystem = async () => {
  //
  // try {
  //   const [handle] = await window.showOpenFilePicker({
  //     types: [{
  //       description:'Markdown Files',
  //       accept: { 'text/markdown': ['.md']}
  //     }]
  //   });
  // }
  // catch (e) {
  //   console.log(e);
  // }

  // }
  //
  //
  // const saveContent = async (handle, newContent) => {
  //
  // }
}

async function download(newCSV: string): Promise<void> {
  return new Promise((resolve) => {
    let datetime = new Date();
    let filename = 'import ' + datetime.toLocaleDateString() + '_' + datetime.toLocaleTimeString('id') + '.csv';
    let element = document.createElement('a');

    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(newCSV));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);

    file.value = null;

    return resolve();
  })
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
