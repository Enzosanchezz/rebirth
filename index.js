//    ░░░░░░▄█▄█░░░░░▄░░░░░░
//    ░░░░██████░░░░░░█░░░░░
//    ░░░░░░███████████░░░░░
//    ▒▒▒▒▒▒█▀▀█▀▀██▀██▒▒▒▒▒
//    ▒▒▒▒▒▄█▒▄█▒▒▄█▒▄█▒▒▒▒▒
//    ~~~~~~~~~~~~~~~~~~~~~~
import { listen } from "./src/app.js";
import { conn } from "./src/db.js";
import { getPets } from "./src/tools/preCharge.js";
import { getAdmin } from "./src/tools/preChargeAdmin.js";

import { getTestimonials } from "./src/tools/preChargeTestimonials.js";

const { PORT } = process.env;

conn.sync({ force: false }).then(async () => {
  await getTestimonials();
  await getAdmin();
  await getPets();

  listen(PORT || 7859, () => {

    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
