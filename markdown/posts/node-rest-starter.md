---
slug: express-rest-starter
title: Node.JS, Express.JS & MongoDB starter
description: Bardzo prosty bolierplate do pracy z Node, Express i MongoDB. Aplikacja CRUD, na której podstawie można uczyć się bardziej zaawansowanych rzeczy.
date: Mon Sep 30 2019 02:00:00 GMT+0200 (czas środkowoeuropejski letni)
author: Sebastian Łuszczek
tags: [tutorial, nodeJS, express, REST, mongoDB]
cover_img: /images/og_bgi.jpg
---

## Proste projekty w Node.JS nie takie straszne

Aby zacząć pisać aplikację, w pierwszej kolejności należy się upewnić, że posiadamy zainstalowane na komputerze Node.JS i npm:

```bash
node -v
npm -v
```

Jeśli otrzymamy wersję tych pakietów to wszystko ok. Dalej przenosimy się do miejsca, w którym chcemy rozpocząć nasz projekt. Aby rozpocząć, jak w przypadku każdego projektu w Node.JS rozpoczynamy od inicjalizacji projektu.

```bash
npm init -y
```

Komenda ta tworzy prosty plik package.json, który definiuje nasze zależności. W tym samym katalogu zakładamy folder src a w nim plik _app.js_, który będzie naszym wyjściowym plikiem aplikacji.

```bash
mkdir src && touch src/app.js
```

W pliku package.json zapisywane są wszystkie paczki, z których korzystamy w projekcie. Poza dependencies zapisane tu są również podstawowe dane o projekcie. Dla nas narazie całkowie nieważne, gdyz skupiamy się jedynie na mechanice **aplikacji CRUD**.

Jedyne co musimy zmienić na wstępie to pole _"main"_ wskazujące na główny plik projektu, u nas _src/app.js_

```json
// package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "src/app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Będąc przy package.json pora zainstalować kilka dependencies, z których będziemy korzystać w projekcie:

```bash
npm i express mongoose nodemon
```

Po kolei:

- **Express** - najbardziej popularny framework Node.JS. Znacznie ułatwia i przyśpiesza pracę w Node, no bo _"po co wymyślać koło na nowo..."_
- **mongoose** - JavaScript'owy klient bazy danych no-sql o nazwie MongoDB, w której będziemy zapisywać nasze dane
- **nodemon** - mała biblioteka pozwalająca na płynniejszą pracę z Expressem, automatycznie przebudowuje i przeładowuje projekt (server) przy zapisaniu zmian w projekcie

Pora dodać podstawową funkcjonalność naszej aplikacji, w pliku _src/app.js_ importujemy framework _'express'_, inicjalizujemy go i ustawiamy nasłuch na _localhost:5000_ gdzie 5000 jest numerem portu.

```js
// src/app.js

const express = required("express");

const app = express();

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

Aby wystartować serwer musimy teraz odpalić plik _src/app.js_ za pomocą node.js, co możemy zrobić w terminalu za pomocą komendy

```bash
node src/app.js
```

Powinniśmy zobaczyć teraz w konsoli _"Server started on port 5000!"_. Nasz serwer działa i nasłuchuje na porcie 3000. Możemy go znaleźć wpisując w przeglądarce http://localhost:5000. Nic tam jeszcze nie zobaczymy, więc można sobie podarować odwiedzanie adresu. Dodajmy za to naszą komendę wywołania do _package.json_, jak i skorzystajmy z pakietu _nodemon_ instalowanego wcześniej.

```json
// package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "serve": "nodemon src/app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.7.3",
    "nodemon": "^1.19.3"
  }
}
```

Obiekt _"scripts"_ pozwala przechowywać komendy przydatne dla projektu. Metoda _serve_ uruchamia nasłuch na zmiany i utrzymuje server w działaniu. Metoda _start_ odpala go jednorazowo, po każdych zmianach w projekcie trzeba by go było restartować. Dlatego też będziemy używać komendy _serve_, odpalanej następujaco:

```bash
npm run serve
```

## Podstawowy routing

Zacznijmy od wyświetlenia czegoś na ekranie, gdy odwiedzimy adres http://localhost:5000. Dodajmy więc route dla tego adresu

```js
// src/app.js

const express = required("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

Po odpaleniu w przeglądarce widzimy teraz znamienne _Hello World!_ (aby tradycji stało się za dość).
Utworzyliśmy więc pierwszą ścieżkę, pierwszy url.

Parametry metody get (req i res) to opdpowiednio obiekt żądania (req - request) i obiekt odpowiedzi (res - response), za ich pomocą jesteśmy w stanie odbierać jak i przekazywać informacje do metody 'GET' protokołu http.

Za pomocą metody metody res.send mozemy wysyłać proste informacje, np. stringi lub tagi html. W tym projekcie zdecydowanie częściej będziemy wysyłać obiekty formatu JSON metodą res.json(). Wyślijmy więc prosty obiekt.

```js
// src/app.js

...

app.get("/", (req, res) => {
  res.json({
    name: "Sebastian",
    job: "developer",
    age: 28
  });
});

...
```

## Podłączmy bazę danych

Aby nie robić tego projektu na _"suchych"_ danych, podepniemy bazę danych _MongoDB_, a dokładnie jej cloud'owego klient _Atlas_. Nie będę tu o tym za dużo pisał, pewnie powstanie o tym kiedyś wpis ;)

Ze strony https://www.mongodb.com/cloud/atlas po zalogowaniu, założeniu bazy danych klikamy zakładkę connect i kopiujemy string potrzebny do podłączenia. Przyda nam się za chwilę. Aby nas serwer został połączony z DB musimy zaimportować moduł _'mongoose'_ i zainicjalizować połączenie.

```js
// src/app.js

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://<userName>:<password>@cluster0-ympqd.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to MongoDB")
);

app.get("/", (req, res) => {
  res.json({
    name: "Sebastian",
    job: "developer",
    age: 28
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

_console.log_ w callback'u powie nam o powodzeniu połączenia z bazą danych. Zobaczymy go w terminalu zaraz pod informacją, że nasz serwer wystartował na porcie 5000. Wewnątrz tego przydługawego stringu w metodzie _mongoose.connect_ odpowiednie miejsca trzeba podmienić swoimi danymi konta na platformie Atlas.

Możemy teraz rozpocząć pisanie Aplikacji CRUD (Create - Read - Update - Delete), a nasze dane będą zapisywane i odczytywane z bazy danych.

## Niby No-SQL ale Schema potrzebna

Gdy poczytamy o MongoDB dowiemy się, że baza przyjmie rózne struktury danych, dla nas jednak za duża dowolność może być zgubna, z tego też powodu utworzymy sobie Scheme obiektu bazy danych, czyli tak jakby wzorzec tego co będziemy w niej przetrzymywać.

Warto mieć taką schemę poza głównym plikiem dla łatwiejszego odnajdywania się w kodzie. Plik ze schemą nazwiemy _Books.js_ i umieścimy go w katalogu _src/models_.

```js
// src/models/Book.js

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publication: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Book", bookSchema);
```

W pliku wzorca po zaimportowaniu modułu _'mongoose'_ deklarujemy w obiekcie Schemy pola jakie powinien zawierać, ich type, oraz ewentualnie defaultową wartość czy wymóg ich podania. Nie chcę za dużo tu o tym pisać, gdyż o walidacji tych danych powstanie niedługo kolejny wpis na blogu/notatniku przy temacie autentykacji. Tak powstały model mozemy exportować.

Importujemy model do naszej aplikacji serwera, aby móc z niego korzystać w poszczególnych requestach.

```js
// src/app.js

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// import modelu
const Book = require("./models/Book");

...
```

## Metoda POST aby tworzyć

Zaczniemy od dodania funkcjonalności aplikacji związanej z dodawaniem nowych rekordów do bazy danych. Zanim zaczniemy jednak coś dodawać musimy dodać możliwość parsowania danych wysyłanych w metodzie POST. Dla ułatwienia taką funkconalność daje nam sam framework express. Wystarczy tylko przed ścieżkami wywołać tzw. middleware, czyli metodę, która będzie wykonywała się dla każdego requestu do serwera. W naszym przypadku będzie to metoda _express.json()_ gdyż na parsowaniu obiektów _JSON_ nam zależy.

```js
...
const app = express();

// import modelu
const Book = require("./models/Book");

app.use(express.json());

...
```

Jeśli jesteśmy już przy wysyłaniu i odbieraniu danych, to potrzebny będzie nam program, pozwalajacy wysyłać dany w requeście (dla metody POST i PUT) i w łatwy oraz czytelny sposób odbierać responsy. Idealnie nada się do tego program **Insomnia** (na Linux'y) lub szerzej znany **Postman**.

Metoda http _POST_ pozwala przekazywać dane, będzie więc słuzyć do dodawania rekordów bazy danych. Najprościej moze to wyglądać w ten sposób:

```js
// src/app.js
...

app.use(express.json());

// POST book
app.post("/", async (req, res) => {
  try {
    const book = Book.create({
      title: req.body.title,
      author: req.body.author,
      publication: req.body.publication
    });
    res.json({
      message: "Book posted to DB",
      book
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
});

...

// POST book
```
