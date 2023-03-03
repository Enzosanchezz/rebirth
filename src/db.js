require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const pg = require('pg');

const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE, PORT } = process.env;


const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE}`,
  // `postgresql://${{ DB_USER }}:${{ DB_PASSWORD }}@${{ DB_HOST }}:${{ PORT }}/${{ DATABASE }}`,
  // process.env.DATABASE_URL,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    timestamps: false,
    dialectModule: pg,
    // dialectOptions: {
    //   ssl: {
    //     required: true,
    //     rejectUnauthorized: false, 
    //   },
    // },
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pets, Message, Adoption, SuccessStories, User,Notification } = sequelize.models;

User.hasMany(Adoption); 
Adoption.belongsTo(User, { as: "owner", foreignKey: "ownerMail" });
Adoption.belongsTo(User, { as: "adopter", foreignKey: "userMail" });

Pets.hasMany(Adoption);
Adoption.belongsTo(Pets);
//----------------------------//

User.hasMany(Pets);
Pets.belongsTo(User);

//----------------------------//

User.hasMany(SuccessStories);
SuccessStories.belongsTo(User); 

//---------------------------//

Adoption.hasMany(Message); 
Message.belongsTo(Adoption, { foreignKey: "adoptionId" }); 

User.hasOne(Notification);
Notification.belongsTo(User); 


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
