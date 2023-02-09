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
  const emailParam = req.query.email;
  const isValidEmail =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
      emailParam
    );

  if (req.query.user && req.query.password && emailParam && isValidEmail) {
    if (
      db.data.users.find(
        (item) => item.user == req.query.user || item.email == req.query.email
      )
    ) {
      res.send({ success: false });
      console.log(`Failed to register user ${req.query.user}. Already exists.`);
    } else {
      const newUser = {
        user: req.query.user,
        email: req.query.email,
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
    const userFound = db.data.users.find(
      (item) =>
        (item.user.toLowerCase() == req.query.user.toLowerCase() ||
          item.email.toLowerCase() == req.query.user.toLowerCase()) &&
        item.password == sha256(req.query.password).toString()
    );
    //Si existe un resultado, hacemos login devolviendo el user_id
    if (userFound) {
      res.send({ user_id: userFound.user_id, success: true });
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

app.get(config.API_BASE + "/get-notes", (req, res) => {
  //Comprobamos que exista el campo user_id en la query
  const userId = req.query.user_id;
  const userFound = db.data.users.find((item) => item.user_id == userId);

  if (userId && userFound) {
    //Filtramos las notas creadas por el user_id recuperado
    const notesFound = db.data.notes.filter((item) => item.user_id == userId);
    //Devolvemos las notas y el nombre de usuario
    res.send({ user: userFound.user, data: notesFound, success: true });
    console.log(`User notes have been retrieved: ${userId}.`);
  } else {
    res.send({ success: false });
    console.log("Access Denied.");
  }
});

app.get(config.API_BASE + "/upsert-note", (req, res) => {
  const userId = req.query.user_id;
  const userFound = db.data.users.filter((item) => item.user_id == userId);
  const noteId = req.query.note_id;
  const noteFound = db.data.notes.filter((item) => item.note_id == noteId);

  if (userId && userFound.length > 0) {
    if (noteId && noteFound.length > 0) {
      // Si viene noteId actualizamos la nota
      noteFound[0].text = req.query.text;
      res.send({ note_id: noteId, success: true });
      db.write();
    } else {
      const newNoteId = nanoid();
      db.data.notes.push({
        note_id: newNoteId,
        user_id: userId,
        text: req.query.text,
        date: Date.now(),
      });
      res.send({ note_id: newNoteId, success: true });
      db.write();
    }
  } else {
    res.send({ success: false });
    console.log("Access Denied.");
  }
});

app.get(config.API_BASE + "/delete-note", (req, res) => {
  const userId = req.query.user_id;
  const noteId = req.query.note_id;
  const noteFound = db.data.notes.find((item) => item.note_id == noteId);

  if (userId && noteId && noteFound && noteFound.user_id == userId) {
    const notesUpdate = db.data.notes.filter((item) => item.note_id !== noteId);
    db.data.notes = notesUpdate;
    res.send({ deleted_note: noteId, success: true });
    db.write();
  } else {
    res.send({ success: false });
    console.log("Access Denied.");
  }
});

// Start to listening requests on port 4000
app.listen(config.APP_PORT);
console.log(`--- Server listening on port ${config.APP_PORT} ---`);
