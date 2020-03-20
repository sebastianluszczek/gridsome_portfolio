---
slug: flask-api-crud
title: Prosta CRUD aplikacja przy użyciu Flask'a
description: Pierwszy wpis rozpoczynający serię poświęconą backendowi w Pythonie. Będzie to próba stworzenia bardzo prostej CRUD aplikacji przy użyciu pythonowej biblioteki Flask. Na początku bez zewnętrznych baz danych itp. Pokażę też jak stworzyć poprawnie środowisko dla projektu w pythonie.
date: 2020-02-29
author: Sebastian Łuszczek
tags: [tutorial, python, Flask, back-end]
cover_img: /images/green-python.jpg
published: true
---

## W końcu przyszedł czas na nowe technologie

Po dłuższej nieobecności na blogu zebrałem się wreszcie, aby coś napisać. Na wstępie może nadmienię, że nieobecność była związana ze zmianą pracy. Nadal programuję (w końcu backendowo :D), ale drastycznie zmienił się mój _stack_. Zajmuję się teraz głównie _*Python'em*_ i szeroko rozumianym _*Data Science*_. Z tego też względu, w najbliższych wpisach dużo pewnie będzie właśnie __*Python'a*__, __*Flask'a*__ w kontekście _RESTful APIs_, połączeń z różnego rodzaju relacyjnymi i nierelacyjnymi bazami danych oraz konteneryzacji (_Docker_).

Chciałbym stworzyć właśnie taki prosty cykl kilku wpisów, gdzie będę opisywał poszczególne etapy i warianty tworzenia _RESTful API_ w _Flask'u_. Pewnie w późniejszym czasie, również dla ugruntowania własnej wiedzy, postaram się opisać narzędzia i procesy przetwarzania danych i ogólnie _Data Science_. Wspomnę o bibliotekach _Pandas_, _Numpy_, _Sklearn_ itp.

## Zaczynamy od środowiska

Na wstępie zakładam, że _Python3_ jest zainstalowany na maszynie i możemy rozpocząć pracę. Będę pracował na _Python'ie 3.7_, więc sprawdzenie wersji powinno zwrócić coś podobnego:

```bash
$ python -V

Python 3.7.4
```

Możemy więc zabrać się za utworzenie folderu projektu. W nim to przygotujemy sobie środowisko do pracy. Aby to zrobić, musimy zadbać o odpowiednie narzędzia. Będziemy potrzebować biblioteki _venv_ więc jeśli jej nie posiadamy, należy ją zainstalować za pomocą _pip_.

```bash
$ pip install venv
```

Jeśli posiadamy już zainstalowaną tę bibliotekę, wystarczy, że w folderze naszego projektu odpalimy 2 komendy.

```bash
$ python3 -m venv my_env
```

```bash
$ source my_env/bin/activate
```

Pierwsza z nich utworzy wirtualne środowisko. Zobaczymy w katalogu projektu folder *./my_env*, który będzie odpowiedzialny za przechowywanie informacji o naszym środowisku. Kolejna komenda aktywuje środowisko. O aktywnym środowisku poinformuje nas nazwa środowiska w nawiasie na samym początku wiersza poleceń, w naszym przypadku *(my_env) $*.

> Wirtualne środowisko pozwala nam instalować paczki _Python'a_ tylko w obrębie tego środowiska. Gdy odpalimy teraz w wierszu poleceń np. _pip install flask_, biblioteka _flask_ zostanie zainstalowana tylko w tym środowisku, nie zostanie dodana do globalnego rejestru. Dzięki temu możemy utrzymać porządek na komputerze, nie zaśmiecając naszej głównej dystrybucji _python'a_. Takie podejście ma również na celu zachowanie porządku w wersjach paczek, każdy z naszych projektów może dzięki temu korzystać z dokładnie określonej wersji zainstalowanej w konkretnym środowisku.

## Minimalna Flaskowa aplikacja

Gdy wirtualne środowisko do pracy z _Python'em_ jest już przygotowane, możemy zacząć pisać kod. Na początku jednak pozostaje nam jeszcze zainstalować bibliotekę _Flask_, z której to będziemy głównie korzystać.

```bash
(my_env) $ pip install flask
```

> Aby sprawdzić, jakie paczki mamy w tym momencie zainstalowane, możemy skorzystać z funkcjonalności polecenia _pip_:
>```bash
>(my_env) $ pip freeze
>
>Click==7.0
>Flask==1.1.1
>itsdangerous==1.1.0
>Jinja2==2.11.1
>MarkupSafe==1.1.1
>Werkzeug==1.0.0
>```
> Pamiętać należy, że podobnie jak działo się to w przypadku _npm_, _pip_ instaluje również wszystkie paczki, których potrzebuje _flask_ (dependencies). Stąd dodatkowe elementy na liście. Każda z paczek ma również zdefiniowaną wersję, gdyż za pomącą _pip_ możemy zainstalować dokładnie określoną (starszą) wersję, automatycznie natomiast, zainstalowana zostaje ostatnia stabilna wersja.

Kolejnym krokiem jest stworzenie głównego pliku naszej aplikacji i otworzenie go IDE (ja oczywiście korzystam z Visual Studio Code).

```bash
touch app.py && code app.py
```

Minimalna aplikacja w _Flask'u_ wygląda następująco:

```python
# app.py

from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello world'
```

W pierwszej, z biblioteki _flask_ importujemy klasę _Flask_, następnie tworzymy instancję tej klasy, _app_, przekazując do konstruktora nazwę modułu (możemy tu dla uproszczenia założyć, że jest to nazwa pliku, w którym się znajdujemy).

W kolejnej linii, przy pomocy dekoratora przekazujemy aplikacji, że gdy nasz serwer dostanie zapytanie na endpoint _'/'_, ma odpalić funkcję _home()_, która to zwróci standardowe _'Hello world'_. Ta bardzo prosto zbudowana aplikacja jest już w pełni działającym _Flask'owym_ serwerem. Pozostało nam tylko go wystartować.

Aby to zrobić, musimy zdefiniować _PATH_ do naszej aplikacji, abyśmy mogli ją odpalać za pomocą _flask cli_, czyli zestaw komend, który udostępnia nam biblioteka.

```bash
(my_env) $ export FLASK_APP=app.py
```

Teraz możemy wystartować aplikację:

```bash
(my_env) $ flask run
```

Aplikacja jest już dostępna z poziomu _localhost_. Aby zobaczyć nasze _'Hello world'_ musimy odpytać endpoint za pomocą dowolnego z narzędzi, typu _Postman_, _curl_, czy po prostu przeglądarka. Dla łatwości prezentacji i uniwersalności, przykłady tutaj będą testowane za pomocą _curl'a_, o którym pisałem więcej tutaj: [Node.JS & Express.JS CRUD app starter](https://www.amazeddeveloper.pl/blog/node-express-crud-starter/)

```bash
(my_env) $ curl http://localhost:5000/

Hello world
```

_Flask_ automatycznie startuje swoje aplikacje na porcie 5000. Jak widać, otrzymaliśmy to, czego się spodziewaliśmy. Możemy zacząć rozbudowywać naszą aplikację!

> W tym jeszcze miejscu warto nadmienić parę dodatkowych funkcjonalności _flask cli_. Głównie chodzi mi o reakcje serwera na zmiany w plikach, abyśmy nie musieli za każdym razem, jak zmieni się _app.py_, zatrzymywali i odpalali ponownie serwer.
> Aby było to możliwe, wystarczy zmodyfikować delikatnie naszą komendę:
>
>```bash
>(my_env) $ FLASK_ENV=development flask run
>```
>
>Spowoduje ona, że serwer zostanie odpalony jakby w środowisku developerskim, z ułatwioną możliwość debugowania i reagujący na zmiany w plikach.
>
>Dwie również użyteczne metody, które mogą się nam przydać w przyszłości to _--host=0.0.0.0_ oraz _--port=5555_, które pozwalają na odpalenie serwera ze zmienionymi odpowiednio hostem (nie będzie to już wtedy _localhost_), oraz z portem innym niż defaultowe dla _flask'a_ 5000.

## Aplikacja CRUD - CreateReadUpdateDelete

Jak już było pisane na wstępie nie będziemy się tu skupiać na połączeniu z bazą danych, za to odpowiedzialne będą kolejne 2 wpisy (połączenie z bazą SQL na przykładzie _MySQL_ i bazą No-SQL na przykładzie _MongoDB_).

Tutaj skupimy się tylko na samej funkcjonalności _CRUD_ opartej tylko i wyłącznie na operacjach na standardowych python'owych obiektach (słowniki i listy). Dlatego też nasza symulowana baza danych będzie listą słowników, gdzie każdy słownik będzie zawierał informacje o pojedynczym wpisie na blogu. Przykładowa budowa takiej listy na potrzeby naszej aplikacji może wyglądać następująco:

```python
# app.py

from flask import Flask, jsonify

app = Flask(__name__)

posts = [
    {
        "id": 1,
        "title": "1st Post",
        "body": "Lorem ipsum of post 1"
    },
    {
        "id": 2,
        "title": "2nd Post",
        "body": "Lorem ipsum of post 2"
    }
]

# get all posts
@app.route('/api/posts', methods=['GET'])
def get_posts():
    return jsonify(posts)
```

Jako zmiany trzeba nadmienić, poza dodaniem listy z postami, import dodatkowej funkcjonalności z pakietu _flask_. Metoda _jsonify_ pozwala jakby przekonwertować obiekt _posts_ na obiekt w formacie _JSON_, który możemy zwrócić z naszego endpointu. Zmieniła się również nazwa metody i ścieżka endpointu. W ten sposób będzie łatwiej opisywać, co w danym momencie robimy. Dekorator _@app.route()_ otrzymał także definicję metody _HTTP_, dzięki temu ten właśnie endpoint zostanie odpalony wyłącznie, gdy metoda requestu będzie zgodna.

Możemy teraz sprawdzić działanie naszego API:

```bash
(my_env) $ curl http://localhost:5000/api/posts

[
    {
        "body": "Lorem ipsum of post 1",
        "id": 1,
        "title": "1st Post"
    },
    {
        "body": "Lorem ipsum of post 2",
        "id": 2,
        "title": "2nd Post"
    }
]
```

Aby za bardzo nie przedłużać, teraz gdy już wiemy, na czym polega konstrukcja zapytań i samych endpointów, szybko przejdziemy przez pozostałe funkcjonalności.

### Pobieranie pojedynczego rekordu

Aby skutecznie pobrać jeden rekord z naszej listy, musimy w jakiś sposób zdefiniować, o który dokładnie nam chodzi. Najprostszym sposobem będzie dodanie do _URL_ zmiennej, określającej charakterystyczną cechę rekordu, zazwyczaj będzie to _id_.

```python
# app.py
...

# get single post
@app.route('/api/posts/<int:id>', methods=['GET'])
def get_post(id):
    post = [post for post in posts if post['id'] == id]
    return jsonify(post)
```

Nowy endpoint różni się nieznacznie od poprzedniego, jak wspomnieliśmy wyżej w URL'u zdefiniowaliśmy zmienną id (o typie integer - _int:id_), którą następnie przekazujemy do funkcji *get_post(id)*, dzięki czemu możemy z niej później korzystać.

W samej funkcji wykonujemy proste _list comprehension_, w którym ograniczamy listę tylko do rekordów, których id zgadza się z naszym szukanym id (przekazanym do funkcji). Jako że z definicji _id_ powinno być niepowtarzalne, nasza lista _post_ ma tylko jeden element, który zwracamy przetworzony przez _jsonify()_ w sekcji _return_.

Za pomocą _curl'a_ testujemy endpoint _http://localhost/5000/api/posts/1_:

```bash
curl http://localhost:5000/api/posts/1

[
    {
        "body": "Lorem ipsum of post 1",
        "id": 1,
        "title": "1st Post"
    }
]
```

### Dodawanie nowego rekordu

Sprawa dodawania nowego rekordu do bazy danych z poziomu RESTful API zazwyczaj jest dość skomplikowana, trzeba sprawdzić, czy przesyłane dane zgadzają się z _schemą_. W naszym wypadku nie musimy się o to martwić, jedyne co musimy zrobić to dodać element do listy za pomocą metody _.append()_.

```python
# app.py
from flask import Flask, jsonify, request

app = Flask(__name__)

...

# POST new post
@app.route('/api/posts', methods=['POST'])
def post_post():

    new_post = request.json
    posts.append(new_post)

    return jsonify(posts), 201
```

Jedyną rzeczą, która jest trochę inna i będzie się pojawiać w kolejnych endpointach to potrzeba przekazania za pomocą _curl'a_ danych (w tym wypadku obiektu, który chcemy dodać do listy postów) i oczywiście odebrania ich w endpointach API. Nad tym, jak przekazać obiekt JSON _curl'em_ nie będę tu pisał, odsyłam do mojego wcześniejszego posta lub dokumentacji.

Odebranie za to tych danych w endpoincie jest bardzo proste. Musimy zaimportować z pakietu _flask_ dodatkowy obiekt, mianowicie _request_. Obiek ten posiada wszystkie dane na temat przychodzącego requestu, takie jak np. metoda HTTP, czy właśnie dane (jakby body requestu). Jako że zazwyczaj w takich sytuacjach dane wysyła się w RESful APIs w formacie JSON i my tak będziemy robić. Dlatego też do tych danych z requestu dostaniemy się za pomocą atrybutu _request.json_. Tak pobrane dane wystarczy dodać do listy _posts_.

```bash
(my_env) $ curl -X POST -d '{"id":3,"title":"3rd Post","body":"Post 3"}' -H "Content-Type: application/json" http://localhost:5000/api/posts

[
    {
        "body": "Lorem ipsum of post 1",
        "id": 1,
        "title": "1st Post"
    },
    {
        "body": "Lorem ipsum of post 2",
        "id": 2,
        "title": "2nd Post"
    },
    {
        "body": "Post 3",
        "id": 3,
        "title": "3rd Post"
    }
]
```

### Usuwanie i edytowanie rekordów

Ostatnią rzeczą, jaką trzeba opisać przy aplikacjach typu CRUD, są metody pozwalające na usuwanie i edytowanie pojedynczego rekordu. Skorzystamy przy tym z metod HTTP _'PUT'_ i _'DELETE'_.

```python
# app.py
...

# PUT (update) post
@app.route('/api/posts/<int:id>;', methods=['PUT'])
def update_post(id):
    global posts

    new_post = request.json
    posts = [new_post if post['id'] == id else post for post in posts]
    return jsonify(posts), 203

# DELETE post
@app.route('/api/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    global posts

    posts = [post for post in posts if post['id'] != id]
    return jsonify([]), 204
```

Na wstępie należy zwrócić uwagę na linijki _'global posts'_ w obu endpointach. Dzięki nim możemy wprowadzać zmiany w globalnej zmiennej, jaką jest lista naszych postów. Zazwyczaj nie powinniśmy wewnątrz funkcji zmieniać globalnych zmiennych, ale tu nie jest to aż takim problemem. Jak przestawimy się na bazy danych, nie będziemy mieli tego problemu.

Metoda *update_post(id)* podobnie jak *post_post()* przyjmuje obiekt JSON z _request'u_, z tą różnicą, że nie dodaje go bezpośrednio do listy postów, a szuka na tej liście elementu z podanym _id_ i podmienia go.

Przy usuwaniu elementu, filtrujemy tablicę za pomocą _list comprehension_ pozostawiając w niej tylko elementy, których _id_ różni się od tego podanego w _requeście_. Obie te metody nadpisują listę postów, stąd potrzebna była linia _global posts_.

## Podsumowanie

Tak oto powstał pierwszy wpis poruszający dość nowe dla mnie technologie (_Flask_, _Python_ itp.), a które będą głównym tematem mojej pracy, jak i głównym tematem kolejnych blogów.

Jest to bardzo prosta aplikacja, która miała na celu tylko pokazanie prostego wykorzystania _Flask'a_. W kolejnych wpisach będę dodawał coraz to nowe funkcjonalności oraz opisywał więcej możliwych zastosowań tych technologi.

Więc do zobaczenia!


