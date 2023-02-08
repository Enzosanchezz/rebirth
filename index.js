//    ░░░░░░▄█▄█░░░░░▄░░░░░░
//    ░░░░██████░░░░░░█░░░░░
//    ░░░░░░███████████░░░░░
//    ▒▒▒▒▒▒█▀▀█▀▀██▀██▒▒▒▒▒
//    ▒▒▒▒▒▄█▒▄█▒▒▄█▒▄█▒▒▒▒▒
//    ~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getPets } = require("./src/tools/preCharge.js");
const { getAdmin } = require("./src/tools/preChargeAdmin.js");
const { getTestimonials } = require("./src/tools/preChargeTestimonials.js");
const { PORT } = process.env;

conn.sync({ force: false }).then(async () => {
  await getTestimonials();
  await getAdmin();
  await getPets();
  
  server.listen(PORT || 7859, () => {
    console.log(`%s listening at port -->${PORT}`);
  });
});
