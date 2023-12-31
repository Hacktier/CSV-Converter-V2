import { boot } from 'quasar/wrappers';
import {app} from "electron";
import store from 'src/settingsStore';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ( { app} ) => {
  app.use(store);
})
