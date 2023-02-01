import sha256 from "crypto-js/sha256.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { nanoid } from "nanoid";
import express from "express";
import cors from "cors";

import config from "./config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, "db.json");

const app = express();
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

const initializeDb = async () => {
  db.data = db.data || {};
  db.data.users = db.data.users || [];
  db.data.notes = db.data.notes || [];

  console.log("--- DB Initialized ---");
  await db.write();
};

// Initialize DB: create fields if they don't exist
await db.read();
initializeDb();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Nothing to see here");
});

//Registro
app.get(config.API_BASE + "/register", (req, res) => {
  if (req.query.user && req.query.password) {
    if (
      db.data.users.filter((item) => item.user == req.query.user).length > 0
    ) {
      res.send({ success: false });
      console.log(`Failed to register user ${req.query.user}. Already exists.`);
    } else {
      const newUser = {
        user: req.query.user,
        password: sha256(req.query.password).toString(),
        user_id: nanoid(),
      };
      db.data.users.push(newUser);
      db.write();
      res.send({ success: true });
      console.log(`Registered user ${req.query.user}`);
    }
  } else {
    res.send({ success: false });
  }
});

//Login
app.get(config.API_BASE + "/login", (req, res) => {
  //Comprobamos que existan ambos campos en la query
  if (req.query.user && req.query.password) {
    //Filtramos el usuario y password
    const userFound = db.data.users.filter(
      (item) =>
        item.user.toLowerCase() == req.query.user.toLowerCase() &&
        item.password == sha256(req.query.password).toString()
    );
    //Si existe un resultado, hacemos login devolviendo el user_id
    if (userFound.length > 0) {
      res.send({ user_id: userFound[0].user_id, success: true });
      console.log(`Access Granted ${req.query.user}.`);
    } else {
      res.send({ success: false });
      console.log("Access Denied.");
    }
  } else {
    res.send({ success: false });
    console.log("Access Denied.");
  }
});

//Get-Notes
//Estructura Notas
//  notes : [
//    {
//      note_id: "",
//      user_id: "",
//      text: ""
//    },
//  ]

app.get(config.API_BASE + "/get-notes", (req, res) => {
  //Comprobamos que exista el campo user_id en la query
  if (req.query.user_id) {
    //Filtramos las notas creadas por el user_id recuperado
    const notesFound = db.data.notes.filter(
      (item) => item.user_id == req.query.user_id
    );
    //Devolvemos las notas
    res.send({ data: notesFound, success: true });
    console.log(`User notes have been retrieved: ${req.query.user_id}.`);
  } else {
    res.send({ success: false });
    console.log("There are no notes.");
  }
});

// Start to listening requests on port 4000
app.listen(config.APP_PORT);
console.log(`--- Server listening on port ${config.APP_PORT} ---`);
