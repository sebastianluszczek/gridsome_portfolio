---
slug: mongoose-populating-virtual
title: Relacje między tabelami w MongoDB - mongoose virtuals i populating
description: Gdy posiadamy w różnych tabelach powiązane ze sobą dane, dobrym pomysłem jest pokazać te relacje. Nie zawsze jednak chcemy dodawać nowe pola w Schemie. Tu z pomocą przychodzą virtuals (wirtualne klucze).
date: 2019-11-08
author: Sebastian Łuszczek
tags: [tutorial, node, mongoose, mongoDB, bazy-danych, back-end]
cover_img: /images/mongoose-populating-virtual.jpg
published: false
---

# Relacje w nierelacyjnych bazach danych

Rozwinięcie skrótu _No-SQL_ nie oznacza, jak wielu myśli, _"Nie-SQL"_, a bardziej _"Not only SQL"_. Mimo tego bazy danych typu _MongoDB_ nie posiadają charakterystycznych dla _SQL_ relacji między tabelami opartych na _primary_key_ i _foreign_key_. W końcu są określane tez jako _"nierelacyjne bazy danych"_. Na całe szczęście _ORM_ jakim jest _mongoose_ daje nam możliwość budowanie virtualnych relacji i populowania danych pomiędzy tabelami. Na tym się właśnei postaram skupić w tym wpisie.

# Początkowy szablon projektu

Aby nie powielać treści wcześniejszych wpisów na temat budowy prostych serwerów w _node.JS_ i _express_, oraz podpinania do nich _MongoDB_, etap budowy wyjściowego serwera postaram sie skrócić do minimum i maksymalnie uprościć. Projekt ten różnił się będzie od poprzednich praktycznie tylko tym, że będzie zawierał i wykorzystywał dwa oddzielne, w późniejszej części połączone ze sobą, modele danych (Schemy). Nie będziemy też budować pełnej funkcjonalnośći _CRUD_ dla obu modeli, w zupełności wystarczą nam ścieżki pozwalające na dodawanie i prezentowanie zasobów (_GET_ i _POST_).

Stróktóra projektu będzie więc wyglądać następująco

```bash
project_folder/
  models/
    Event.js
    Talk.js
  routes/
    events.js
    talks.js
  .env
  package.json
  server.js
```

Standardowo zaczynamy od instalacji pakietów

```bash
npm i express dotenv mongoose
```

```bash
npm i -D nodemon
```

Natomiast podtawowy plik serwera będzie wyglądał następującon

```js
// server.js

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// connect mongoDB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to mongoDB...")
);

// initialize express app
const app = express();

// middleware
app.use(express.json());

// initialize listener
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
```

Oczywiście w pliku _.env_ musimy teraz zapisać nasz bardzo prywatny string, do podłączenia cloudowej wersji _MongoDB_, no i opcjonalnie _PORT_, na którym będziemy nasłuchiwać. Jeżeli coś w tym pliku jak narazie jest nielogiczne, to odsyłam do poprzednich wpisów, gdzie znacznie bardziej szczegółowo opisuje wszystkie te rzeczy. Teraz, gdy nasz serwer jest już możliwy do odpalenia, powinniśmy dodać w pliku _package.json_, w elemencie _scripts_ polecenia odpalajace go.

```json
...

"scripts": {
    "start": "node server",
    "dev": "nodemon server"
  }
...
```

Dzięki poleceniu _npm run dev_ odpalimy serwer w trybie _watch_, który dzięki pakietowi _Nodemon_ będzie nasłuchiwał na zmiany w plikach i przy ich zaobserwowaniu przeładuje nam aplikacje. Przydatna rzecz.

Teraz nie pozostało nam nic innego jak tylko dodać nasze modele dla dwóch tabeli w bazie danych, odpowiednio _Event.js_ i _Talk.js_.

```js
// models/Event.js

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Event", eventSchema);
```

```js
// models/Talk.js

const mongoose = require("mongoose");

const talkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Talk", talkSchema);
```
