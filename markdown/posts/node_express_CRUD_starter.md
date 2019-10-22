---
slug: node_express_CRUD_starter
title: Node.JS & Express.JS CRUD app starter
description: Wpis pokazujący wstępną konfigurację prostej aplikacji CRUD (Create - Read - Update - Delete) w Express'ie przy użyciu mockowych hardcoded data. Na Bazy danych przyjdzie czas ;)
date: Mon Sep 30 2019 02:00:00 GMT+0200 (czas środkowoeuropejski letni)
author: Sebastian Łuszczek
tags: [nodeJS, express, tutorial, back-end]
cover_img: /images/node_express_CRUD_starter.jpg
published: false
---

## Wstępna konfiguracja

Pierwszy etap budowy aplikacji opartej o Node.JS wraz z instalacją i konfiguracją kilku przydatnych dodatków, został juz opisany w poprzednim wpisie. Po szczegóły odsyłam tutaj:

[Konfiguracja projektu w Node.js](https://www.amazeddeveloper.pl/blog/node-base-config/)

Z tego wzgędu nie będę się tutaj dokładnie rozpisywał co robię krok po kroku, a tylko szybko zaznaczę kolejne kroki.

Zaczniemy oczywiście od utworzenia katalogu projektu i zainicjalizowania w nim projektu _node.js_ za pomocą komendy _npm i -y_. W nim tworzymy katalog _/src_ i plik _/src/index.js_. Z takim wyjściowym drzewem plików możemy zainstalować potrzebne pakiety>

Dependencies:

```bash
npm i express dotenv
```

DevDependencies:

```bash
npm i -D nodemon @babel/node @babel/core @babel/preset-env
```

Teraz wystarczy utwożyć pliki _.babelrc_ i _.env_, w których będziemy trzymać odpowiednio konfigurację pakietu _babel_ i zmiennych środowiskowych projektu. Plik ze zmiennymi na razie pozostanie pusty, za to _.babelrc_ wygląda następująco:

```js
// .babelrc
{
  "presets": [
      "@babel/preset-env"
    ]
}
```

## Pierwszy server

> ### Express.JS

> Server będziemy pisać za pomocą pakietu [Express](https://expressjs.com/). Prostego, minimalistycznego frameworku dla Node.JS, który bardzo niewiele narzuca programiście. Struktura aplikacji moze być praktycznie dowolna, do niczego konkretnego nie jesteśmy zmuszeni. Nie jest to za dobre na samym początku przygody, więc będziemy trzymać się dobrych praktyk budowania przejrzystej aplikacji.

> _Express_ świetnie sprawdza się do budowania API typu REST i aplikacji CRUD. Jest jednocześnie najbardziej popularnym frameworkiem _Node.js_, który dodatkowo posiada bardzo niski próg wejścia. Wybrałem go również ze wzgędu na to, że jest z nim najwięcej tutoriali w internecie! :D

Gdy wstępną konfigurację mamy już za sobą pora zacząć pisać właściwą aplikację, na razie prostą, jedno-plikową, ale to do czasu. W pliku _index.js_ musimy zaimportować framework _Express.JS_ i zacząć go używać.

```js
import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

Tak właśnie wygląda najprostsza instancja servera, nie robi ona jeszcze nic poza nasłuchiwaniem na porcie 5000. Nasłuchiwaniem na nic, bo nie zdefiniowaliśmy żadnych ścieżek.

Aby uruchomić taką aplikację dodajmy do pliku _package.json_ skrypty pozwalające na jej odpalenie przez _Nodemon_ i przez standardowy _node.JS_. Nie zapomnijmy o dodaniu fragmentu mówiącego aby odpalanie aplikacji odbywało sie przy pomocy _Babel'a_: _"--exec @babel/node"_.

```json
{
  "name": "express_CRUD",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node --exec babel-node src/index.js",
    "serve": "nodemon --exec babel-node src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.6.4",
    "@babel/node": "^7.6.3",
    "@babel/preset-env": "^7.6.3",
    "nodemon": "^1.19.4"
  },
  "dependencies": {
    "curl": "^0.1.4",
    "dotenv": "^8.2.0",
    "express": "^4.17.1"
  }
}
```

Komenda _"npm run serve"_ odpali naszą aplikację, w trybie nasłuchu na zmiany, przy pomocy pakietu _Nodemon_, a w konsoli zobaczymy wypisane _"Server started on port 5000!"_ Wszystko jak na razie działa wspaniale.

## Routing

Gdy server już działa pora aby zaczął coś odpowiadać, gdy zadamy pu _"pytanie"_. Tak właśnie najprościej mozemy opisać routing serwera, czyli zdefioniowane odpowiedzi na konkretne zapytania. W tym przypadku zapytaniem do serwera jest _request_ na konkretny URL, który serwer opsługuje. Poza samym URLem ważna jest również metoda HTTP skojażona z danym requestem. Mówi ona co chcemy zrobić.

> ### Metody HTTP

> HTTP (skrót od Hypertext Transfer Protocol) jest najczęściej w tym momencie wykożystywanym protokołem w przeglądarkach. Jest to protokół bezstanowy, czyli ani serwer, ani klient (aplikacja "rozmawiająca" z serwerem) nie przechowuje informacji o zapytaniach. Z punktu widzenia połączenia, każde kolejne zapytanie jest traktowane jak całkowicie nowe. Zapytanie składa się z nagłówka i ciała. Nagłówek definiuje mi. metodę HTTP, a ciało to nic innego jak dane, które przekazujemy serwerowi.

> Podstawowe metody HTTP:

> - **_GET_** - pobieranie danych
> - **_POST_** - przesyłanie danych w formacie klucz - wartość
> - **_PUT_** - rónież przesyłanie pakietu danych, zwykle używana do updatowania konkretnego elementu zasobu
> - **_DELETE_** - usuwanie danych

Aplikacja CRUD (Create - Read - Update - Delete), powinna powinna móc wyświetlać dane (wszystkie, jak i pojedyńcze rekordy), dodawać nowe dane, zmieniać dane istniejące i ostatecznie usuwać dane. Pokrycie wszystkich tych metod uzyskamy właśnie za pomocą kombinacji metod HTTP i odpowiednio dobranyc URLi.

Wcześniej jeszcze musimy zadbać o dane, na których będziemy operować, jako, że w tym wpisie nie skupiamy się na bazach danych itp., nasze dane będą prostą tablicą zawierającą _"zahardcodowanych"_ _userów_. Aby móc rozróżnić poszczególne rekordy nadamy im numery identyfikacyjne (id). Żeby mieć pewność, że są one unikatowe skożystamy z pakietu _uuid_, generujacego je za nas.

```bash
npm i uuid
```

```js
import express from "express";
import uuid from "uuid/v4";

const app = express();

let users = [
  {
    id: uuid(),
    name: "John",
    age: 38
  },
  {
    id: uuid(),
    name: "Will",
    age: 29
  },
  {
    id: uuid(),
    name: "Jack",
    age: 28
  }
];

// Routing

// GET all users

// GET single user

// POST new user

// PUT (update) user

// DELETE user

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

### GET all users

Zaczniemy od pobrania wszystkich użytkowników, wykorzystamy do tego metodę **GET** protokołu HTTP. Framework _Express_ umożliwia nam kożystanie z metod HTTP w bardzo prosty sposób, posiada on tak samo nazywające się metody, w których parametrach definiujemy ścieżki. Dla zapytani pobierajacego dane będzie to _app.get(...)_. W parametrach metody podajemy ścieżkę pod którą będziemy wysyłać request.

Kolejnym parametrem metody get jest callback, który ma swoje parametry (req i res), są to opdpowiednio obiekt żądania (req - request) i obiekt odpowiedzi (res - response), za ich pomocą jesteśmy w stanie odbierać jak i przekazywać informacje do metody 'GET' protokołu http.

Za pomocą metody metody res.send mozemy wysyłać proste informacje, np. stringi lub tagi html. W tym projekcie zdecydowanie częściej będziemy wysyłać obiekty formatu JSON metodą res.json(). Wyślijmy więc prosty obiekt.

```js
// src/app.js

...

app.get("/", (req, res) => {
  res.json({
    name: "Sebastian",
    age: 28
  });
});

...
```

Gdy teraz w przeglądarce odpalimy http://localhost:5000/ otrzymamy obiekt JSON, zawierajacy moje imie i wiek.
Ale wracając do naszych użytkowników, chcemy w tym momencie zwrócić wszystkie rekordy z naszej tablicy _users_.
Dla zachowania dobrych praktyk, nie będziemy wysyłać zapytań na http://localhost:5000, bo w późniejszym czasie mogło by to prowadzić do bałaganu. Dobrym pomysłem będzie ustawienie naszego bazowego url na np http://localhost:5000/api/users. Wpisuje się to w standardy _REST_, o którym bliżej opowiem w przyszłości.

```js
// src/app.js

...
// GET all users
app.get("/api/users", (req, res) => {
  res.json({
    data: users
  });
});

...
```

Teraz odwiedzając podany wyzej url naszym oczą ukaże się cała tablica _users_.

### POST user

Kolejnym krokiem będzie dodanie metody pozwalajacej na dodawanie nowych użytkowników. Aby jednak móc dodawać takowych potrzebujemy narzędzia do obsługi zapytań HTTP, gdyż przeglądarka jest w stanie tylko odebrać dane (GET).

> ### cURL

> _"cURL – sieciowa biblioteka programistyczna, napisana w języku C, działająca po stronie klienta, z interfejsami dla ponad 30 innych języków. Umożliwia wysyłanie zapytań HTTP, w tym pobieranie z serwerów stron i plików, a także wysyłanie treści formularzy. Ułatwia tworzenie aplikacji korzystających z protokołu HTTP. Biblioteka cURL posiada ogromne możliwości, jej podstawowym zastosowaniem jest tworzenie sprzęgów w złożonych systemach opartych o technologie Webowe."_

> cytowane za Wikipedią [https://pl.wikipedia.org/wiki/CURL](https://pl.wikipedia.org/wiki/CURL)

> Zainstalujemy bibliotekę globalnie za pomocą _npm_

> ```bash
> npm i -G curl
> ```

> Aby skożystać z tego pakietu wystarczy, że w wierszu poleceń po nazwie pakietu przedstawimy metodę po zwrocie _-X_ oraz następnie URL (dla metody _GET_ nie jest wymagane podawanie typu metody).

> ```bash
> curl http://localhost:5000/api/users
> ```
>
> Otrzymujemy wszystkich userów
>
> ```bash
> > data":[{"id":"38c84dca-4938-4942-aa20-09d5674af55b","name":"John","age":38},{"id":"3f3f04f1-e72b-4617-bf75-0c25604c62d0","name":"Will","age":29},{"id":"95a26b01-0a89-4656-92f1-aff93bab7316","name":"Jack","age":28}]}
> ```
