---
title: meetInCode RESTful API
published: true
description: RESTowe API dla strony organizującej Eventy branżowe, dodawanie i modyfikacja Eventów, skojażonych z nimi Wykładów i pełnych paneli użytkownika i admina. Zaimplementowane role użytkowników pozwalające na dostęp do różnych zasobów.
ctime: 2019-11-19
design:
git: https://github.com/sebastianluszczek/meetInCode-RESTful-API
url: https://documenter.getpostman.com/view/6596745/SW7XYoj3?version=latest
cover_img: /images/meetInCode.png
tech: [nodejs, express, mongo_db]
---

# RESTful API dla aplikacji organizatora _'Eventów'_ branżowych

Pierwszy spory projekt API w _Node.JS_ i _Express_, składający się (na razie) z 4 różnych modeli danych.
Aplikacja pozwala na czytanie, dodawanie i modyfikacje _'Eventów'_, _'Wykładów'_ i _'Użytkowników'_. Do tego różne zasoby i akcje na nich wymagają różnych stopni dostępu. Pozwala na to nadawanie użytkowniką jednej z czterech ról ['user', 'lecturer', 'organizer', 'admmin'].
W obrębie ról zabezpieczone są modyfikacje dokumentów przez użytkowników nie będących ich twórcami (_ownership_).

---

## Aplikacja korzysta z:

<div class="md_icons_wrapper">
<img src="/icons/nodejs.png" alt="Node.js" class="md_icon">
<img src="/icons/express.png" alt="express" class="md_icon">
<img src="/icons/mongo_db.png" alt="MongoDB" class="md_icon">
<img src="/icons/JWT.png" alt="JWT tokens" class="md_icon">
</div>

---

Jest to pierwszy etap tworzenia API, w przyszłości postaram się rozwinąć dalej dokumentacje i zdeployować ją na serwery serwisów typu _heroku_.

Również jednym z kolejnych etapów jest dorobienie _Front-End'owej_ aplikacji klienta w _**Vue.JS**_. Wtedy też pewnie wyjdzie na jaw, czego API jeszcze potrzebuje aby funkcjonować najlepiej i najprzejrzyściej.
