---
slug: flask-restful-basics
title: Podstawy Flask-RESTful
description: Pisanie RESTowych API przy użyciu Flask jest sprawą prostą, ale można je jeszcze ułatwić. Pakiet Flask-RESTful pozwala pisać aplikacje REST szybciej, sprawniej, oraz narzuca wiele dobrych praktyk ułatwiających pisanie i utrzymanie kodu.
date: 2020-03-20
author: Sebastian Łuszczek
tags: [tutorial, python, Flask, back-end]
cover_img: /images/order_cabins.jpg
published: true
---

## Trochę więcej niż *czysty* Flask

Pisaie RESTowych API przy użyciu *Flask'a* jest sprawą prostą, ale można je jeszcze ułatwić. Pakiet *Flask-RESTful* pozwala pisać aplikacje REST szybciej, sprawniej, oraz narzuca wiele dobrych praktyk ułatwiających pisanie i utrzymanie kodu. Z tego względu zmienia się koncepcja pisania tego cyklu tutoriali. Wpis: [Prosta CRUD aplikacja przy użyciu Flask'a](https://www.amazeddeveloper.pl/blog/flask-api-crud/), który miał być pierwszą częścią cyklu, staje się jakby elementem *0*, gdyż zdecydowałem, że czemu by nie korzystać z dobrodziejstw *Flask-RESTful* i jednak na nim oprzeć trzon aplikacji.

Kolejne artykuły:

0. [Prosta CRUD aplikacja przy użyciu Flask'a](https://www.amazeddeveloper.pl/blog/flask-api-crud/)
1. **[Podstawy Flask-RESTful](https://www.amazeddeveloper.pl/blog/flask-restful-basics/)**
2. *RESTowa aplikacja z Flask-RESTful i MySQL*
3. _Prostsza komunikacja z bazą danych w Flask-RESTful dzięki SQLAlchemy_
4. _Flask-RESTful i MongoDB na przykładnie pymongo_
5. _Autentykacja w RESTowym API za pomocą flask-JWT_
6. *Podstawy jinja template engine w aplikacji flaskowej*

Aby sprawnie używać *Flask-RESTful* trzeba mieć troszeczkę więcej wiedzy na temat podstaw *Python'a*, a dokładniej podejścia obiektowego, gdyż korzysta on z klas, ale na potrzeby takiego prostego tutorialu nie sprawia to większego problemu.

Tak sami twórcy opisują pakiet:

> ## Flask-RESTful
> Flask-RESTful is an extension for Flask that adds support for quickly building REST APIs. It is a lightweight abstraction that works with your existing ORM/libraries. Flask-RESTful encourages best practices with minimal setup. If you are familiar with Flask, Flask-RESTful should be easy to pick up.

## Przygotowanie i strukura projektu

Jak każdy tego typu projekt, zacząć należy od utworzenia katalogu, przejścia do niego i zainicjalizowania pythonowego wirtualnego środowiska. Jeśli proces ten jest niejasny, odsyłam do [Prosta CRUD aplikacja przy użyciu Flask'a](https://www.amazeddeveloper.pl/blog/flask-api-crud/) gdzie piszę o tym trochę więcej.

```bash
$ mkdir flask-restful_api && cd flask-restful_api
```

```bash
$ python3 -m venv venv
```

```bash
source venv/bin/activate
```

Te trzy kroki spowodowały, oprócz utworzenia folderu projektu, powstanie i aktywowanie wirtualnego środowiska z czystym pythonem, w którym będziemy mogli teraz instalować nasze paczki potrzebne w tym projekcie.

Możemy teraz zainstalować potrzebne paczki, w tej części tutorialu będą to tylko Flask i Flask-RESTful

```bash
(venv) $ pip install Flask Flask-RESTful
```

Możemy teraz utworzyć w końcu nasz główny plik aplikacji, to jest *app.py*, otworzyć go w edytorze. I rozpocząć pisanie naszej aplikacji. Podstawowa struktura aplikacji pisanej z *Flask-RESTful* wygląda następująco:

```python
from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class Items(Resource):
    def get(self):
        return {'name': 'TV'}

api.add_resource(Items, '/items')

if __name__ == '__main__':
    app.run(debug=True)
```

Na początku importujemy *Flask'a* oraz z pakietu *Flask-RESTful* dwie klasy, *Resource* i *Api*. Pierwsza z nich, *Resource* odpowiada za zasoby naszej aplikacji, czyli w uproszczeniu grupy endpointów, które możemy powiązać tym samym *urlem*, i które odnoszą się do tych samych struktur danych. Dla każdego z takich zasobów tworzymy własną klasę dziedziczącą po klasie *Resource*. Metody tych klas odpowiadają metodą *http* wykonywanym na tych zasobach.

Klasa *Api* natomiast jest trzonem aplikacji. Tworząc jej, instancję przekazujemy do konstruktora instancję klasy *Flask*, a w późniejszej kolejności dodajemy zasoby i definiuje związane z nimi ścieżki.

W powyższym przykładzie zasób *Items* posiada tylko metodę *GET* zwracającą zahardkodowany obiekt. Dodanie zasobu do obiektu *api* zostało dokonane w linijce:

```python
api.add_resource(Items, '/items')
```

Definiuje ona, że zasobowi *Items* będą przekazywane do przetworzenia requesty, które odnoszą się do ścieżki '/items'. Jak wyżej napisałem, requesty z konkretnymi metodami *http* będą rozpatrywane przez odpowiadające im metody klasy zasobu, w tym wypadku *Items*.

## Ingerencja w API

Api posiadające jeden endpoint, do tego zwracający tylko jeden obiekt jest bardzo mało ciekawe, dodajmy więc funkcjonalność, pozwalającą na przesyłanie w dwie strony. Po pierwsze zasymulujmy bazę danych (za dużo powiedziane), w postaci listy obiektów *items*, na której będziemy przeprowadzać *CRUD* operacje.

```python
...

app = Flask(__name__)
api = Api(app)

items = []

class Items(Resource):
    def get(self):
        return {'items': items}, 200
...
```

Dodałem również, aby nasz jedyny, jak na razie, enpoint zwracał właśnie zawartość tej listy. Nie musimy się przy tym martwić o np. metodę *jsonify*, znaną z *Flask*. *Flask-RESTful* robi już to za nas, do bloku *return* wystarczy przekazać obiekt, który chcemy zwrócić i status kod (zwłaszcza jeśli jest inny niż 200, bo 200 jest dodawane automatycznie).

```bash
(venv) curl -X GET http://127.0.0.1:5000/items

{
    "items": []
}
```

Jako że lista *items* jest pusta, wypadałoby dodać endpoint odpowiedzialny za dotowanie elementów do zasobu *Items*. Dokonamy tego za pomocą metody *post* klasy *Items*.

```python
from flask import Flask, request            #new
from flask_restful import Resource, Api

from uuid import uuid4                      #new

app = Flask(__name__)
api = Api(app)

items = []

class Items(Resource):
    def get(self):
        return {'items': items}, 200

    def post(self):                         #new
        data = request.get_json()           #new
        data['_id'] = str(uuid4())          #new
        items.append(data)                  #new
        return {'item': data}, 201          #new

api.add_resource(Items, '/items')

if __name__ == '__main__':
    app.run(debug=True)
```

Metoda post będzie odpowiadała za dodawanie elementów do listy *items*. W pierwszej kolejności musimy zaimportować pakiet *uuid* do generowania niepowtarzających się kluczy id, nie musimy jej instalować, należy do *standar library* python'a. Z pakietu *flask* natomiast musimy zaimportować abiekt*request* odpowiedzialny za przetrzymywanie informacji na temat przychodzącego do API requestu. Wykonując na nim metodę *.get_json()* przekażemy do zmiennej *data* dane w formacie *JSON*, które były załączone do requestu (*POST*).

W kolejnej linii do obiektu *data* dodajemy klucz *'_id'* zawierający indywidualny i niepowtarzalny id. Niepowtarzalność jest ważna, gdyż właśnie za pomocą *_id* będziemy w późniejszym czasie odwoływać się do konkretnych zasobów (obiektów w liście *items*).

Pozostaje już tylko dodanie całego obiektu *data* do listy za pomocą metody *.append()* i zwrócenie dodanego obiektu jako response. Status odpowiedzi to 201, oznaczający, że dodano dane do zasobu.

Możemy teraz przetestować nową funkcjonalność, związaną z dodawanie rekordów, za pomocą *cutl*

```bash
(venv) $ curl -X POST -d '{"name": "piano", "price": 120.99}' -H "Content-Type: application/json" http://127.0.0.1:5000/items

{
    "item": {
        "name": "piano",
        "price": 120.99,
        "_id": "6e6d04b6-dc45-4128-adb4-06e0db10959a"
    }
}
```

Jeśli ta część działa, możemy teraz sprawdzić, co zwróci wcześniejszy endpoint:

```bash
(venv) $ curl -X GET http://127.0.0.1:5000/items

{
    "items": [
        {
            "name": "piano",
            "price": 120.99,
            "_id": "771d6120-d617-4fc4-a231-c3ce55252b9e"
        }
    ]
}
```

## Pozostałe metody CRUD

Jako że w *Flask-RESTful* zasoby rozróżniamy między innymi po ścieżce, dlatego też, w ramach jednego zasobu możemy zgromadzić wszystkie endpointy odnoszące się do konkretnego obiektu listy *items*, stąd też zasób możemy nazwać *Item*. Jego ścieżką będzie *'/items/<string:_id&gt;'*.

```python
from flask import Flask, request
from flask_restful import Resource, Api

from uuid import uuid4

app = Flask(__name__)
api = Api(app)

items = []

class Items(Resource):
    def get(self):
        return {'items': items}, 200

    def post(self):
        data = request.get_json()
        data['_id'] = str(uuid4())
        items.append(data)
        return {'item': data}, 201

class Item(Resource):                               #new
    def get(self, _id):                             #new
        pass                                        #new

    def put(self, _id):                             #new
        pass                                        #new

    def delete(self, _id):                          #new
        pass                                        #new

api.add_resource(Items, '/items')
api.add_resource(Item, '/items/<string:_id&gt;')    #new

if __name__ == '__main__':
    app.run(debug=True)
```

Podobnie jak w przypadku zasobu *Items*, zasób *Item* jest klasą, która dziedziczy po *Resource*, a każda z jego metod odpowiada metodzie *http*, która może być na nim wykonana. Przewidujemy *get* do pobierania pojedynczego rekordu (obiektu z listy *items*), *put* do updatowania oraz *delete* do usuwania rekordów. Tym razem każda z metod, poza *self* przyjmuje również *_id* rekordu, aby wiedzieć, dokładnie o który rekord chodzi.

W ostatniej nowo dodanej linijce dodajemy zasób *Item* do naszego *api* i przypisujemy mu ścieżkę *'/items/<string:_id&gt;'* co oznacza, że ostatni element url'a będzie stanowił nasz *_id* o typie *string*. Możemy teraz zająć się pozostałymi metodami zasobu *Item*.

### GET single item

Najprostsze będzie pobranie pojedynczego zasobu. Wykonamy to za pomocą metody *get(self, _id)*.

```python
...

class Item(Resource):
    def get(self, _id):
        item = next(filter(lambda x: x['_id'] == _id, items), None) #new
        return {'item': item}, 200 if item else 404                 #new
...
```
Jedyną rzeczą, którą trzeba zrobić to przefiltrować, za pomocą metody *filter(func, iterable)*, listę *items* w poszukiwaniu elementu o *_id* zgodnym z tym przekazanym w url requestu. *filter()* zwraca dość niepożądany przez nas *filter_object*, ale za pomocą funkcji *next()* do której przekazujmy *filter()* jako parametr, otrzymamy tylko wynikowy obiekt. Do tego, jeżeli filtrowanie nie zwróci żadnego obiektu, zostaje zwrócony *default*, w tym wypadku *None*.

Taki obiekt zwracamy w bloku *return*. Do tego za pomocą *'ternary operator'* warunkowo przekazujemy status, odpowiedzi. Jeżeli funkcja *filter()* znajdzie *item*, przekazujemy status *200*, w przeciwnym wypadku *404*.

```bash
(venv) $ curl -X GET http://127.0.0.1:5000/items/30ba5a94-15f1-468c-86ce-efcd31b910bc

{
    "item": {
        "name": "piano",
        "price": 120.99,
        "_id": "30ba5a94-15f1-468c-86ce-efcd31b910bc"
    }
}
```

### DELETE item

Kolejną prostą metodą, jest ta do usuwania konkretnego rekordu.

```python
...

class Item(Resource):
    def get(self, _id):
        item = next(filter(lambda x: x['_id'] == _id, items), None)
        return {'item': item}, 200 if item else 404

    def put(self, _id):
        pass

    def delete(self, _id):
        global items                                            #new
        items = list(filter(lambda x: x['_id'] != _id, items))  #new
        return {'message': f'item {_id} deleted'}, 200          #new
...
```

Wygląda ona dość podobnie jak metoda *get()*, z tą jedynie różnicą, że tym razem za pomocą metody *filter()* nie wyszukujemy obiektu, posiadającego zgodne *_id* z przekazanym w requeście, ale wszystkie posiadające inne *_id* i taką listą nadpisujemy listę *items*. Dzięki temu z naszej listy usunięty został jeden obiekt. Aby wewnątrz metody móc nadpisać globalną zmienną, musimy zadeklarować za pomocą *'global items'*, żeby program nie twożył zmiennej lokalnej *items* tylko odnosił się właśnie do globalnej.

Na koniec wystarczy zwrócić komunikat powodzenia wraz ze statusem.

### PUT (update) item

Metoda *put()* odpowiedzialna za zmienianie danych rekordu, może przysporzyć trochę więcej problemu. Poza samym zmienianiem rekordu powinna ona również móc dodać do listy *items* nowy rekord, gdy rekord o podanym *_id* nie istnieje.

```python
...

class Item(Resource):
    def get(self, _id):
        item = next(filter(lambda x: x['_id'] == _id, items), None)
        return {'item': item}, 200 if item else 404

    def put(self, _id):
        data = request.get_json()                                   #new
        item = next(filter(lambda x: x['_id'] == _id, items), None) #new

        if item:                                                    #new
            item.update(data)                                       #new
            return {'item': item}, 200                              #new
        else:                                                       #new
            data['_id'] = _id                                       #new
            items.append(data)                                      #new
            return {'item': data}, 201                              #new

    def delete(self, _id):
        global items
        items = list(filter(lambda x: x['_id'] != _id, items))
        return {'message': f'item {_id} deleted'}, 200
...
```

Na wstępie, podobnie jak przy metodzie *post()* pobieramy dane przekazane w requeście. Następnie musimy sprawdzić, czy rekord o podanym w ścieżce *_id* znajduje się w naszej bazie. Jeśli tak, nadpisujemy go nowymi danymi z requestu, jeśli nie, postępujemy podobnie jak w metodzie *post()*. Dodajemy mu *_id* (tym razem to z url'a), dodajemy go do listy i zwracamy odpowiedź ze statusem *201*.

## Parsowanie przychodzących requestów

Jak dotąd nie zastanawialiśmy się w ogóle, czy dane przychodzące do naszego *API* są we właściwej formie, czy zawierają poprawne dane itp. Pora dodać odrobinę funkcjonalności, która zautomatyzuje proces parsowania requestów dla całego API.

Taką funkcjonalność daje nam pakiet *Flask-RESTful*, co jest kolejną zaletą stosowania go. Musimy tylko zaimportować pakiet *reqparse* i skorzystać z niego.

```python
from flask import Flask, request
from flask_restful import Resource, Api, reqparse       #new

from uuid import uuid4

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()                       #new
parser.add_argument('name', type=str, required=True)    #new
parser.add_argument('price', type=float, required=True) #new

items = []
...
```

Po zaimportowaniu *reqparse* tworzymy instancję klasy *RequestParser()*. Posiada ona metodę *.add_argument()*, która pozwala nam dodać argumenty danych przychodzących w requeście, ich tym, czy są wymagane itp. Po więcej informacji odsyłam do dokumentacji.

Teraz wystarczy w metodach *post()* i *put()* (gdzie przyjmujemy dane z requestu), podmienić linijkę:

```python
data = request.get_json()
```

na

```python
data = parser.parse_args()
```

Spowoduje to, że przychodzący request (jego *JSON'owa* część), zostanie przepuszczony przez parser. Sprawdzone zostaną argumenty i do zmiennej *data* przekazane tylko te, które spełniają zdefiniowane wymogi.

> Kod całego tego tutorialu można znaleźć tutaj:

> [https://github.com/sebastianluszczek/flask-restful_api/tree/flask-restful_basics](https://github.com/sebastianluszczek/flask-restful_api/tree/flask-restful_basics)

## Podsumowanie

Pakiet *Flask-RESTful* zdecydowanie pomaga w pisaniu usystematyzowanego RESTowego API. Pisanie w *Flask'u* nie jest trudne, ale trzeba pamiętać o wielu rzeczach, które tu mamy "out of the box". Również struktura aplikacji bardziej pomaga w utrzymaniu kodu, wszystko jest na swoim miejscu i ładnie poukładane.

Jest to pierwszy wpis serii związanej z budowaniem REST API. W kolejnych częściach omówione zostaną zagadnienia związane z bazami danych (SQL i No-SQL) oraz autentykacją i zabezpieczaniem API za pomocą JWT.