---
title: Vue & Firebase ToDo App
description: Aplikacja internetowa, za której wygląd odpowiadają Vue.js i Vuetify, a za funkcjonalność Firebase od Googla. Poza bazą danych (Firestore) używam również ich wbudowanej autentykacji.
ctime: 2019-06-26
url: 
git: https://github.com/sebastianluszczek/vuetify-todo-app
img: /projects_img/vue-firebase_todo.png
tech: vuejs,firebase,vuetify
---

# Vue & Firebase ToDoApp


Pomysł na projekt wziął sie ztutorialu na youtube [Vuetify Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9g0MQZfHwKcuB0Yswgb3gA5). 
Kurs mówił głównie o wykorzystaniu Vuetify ale ze względu na pomysł dodania do projektu Firebase, zainteresowałem się nim.

---
## Aplikacja korzysta z:
<div class="md_icons_wrapper">
<img src="/icons/vuejs.png" "Vue.js" class="md_icon">
<img src="/icons/vuetify.png" "Apollo" class="md_icon">
<img src="/icons/firebase.png" "Sass" class="md_icon">
</div>

---


Trzon aplikacji napisany jest w **Vue.js** z wykorzystaniem **Vue Routera** i **Vuex**'a, za stylowanie odpowiada Vuetify.
Za backen w podejściu serverless odpowiada Firebase. **Firestore** jako baza danych, **Firebase Storage** do przechowywania avatarów zarejestrowanych klientów,
oraz **Firebase Authentication**. Osoba, która się zaloguje może tworzyć, edytować i usówać 'todoosy', a zapisują się one z przypisanym imieniem twórcy.
Aplikacja uwzględnia również sortowanie po dacie utworzenia i po twórcy.
Każda zarejestrowana osoba może dodać sobie avatar image. W przyszłości chcę dodać możliwość odznaczania tasków jako do zrobienia/zakończone itp. oraz większe możliwości edycji profilu.

Oczywiście jak czas pozwoli i nie zajmę się znów czymś nowym.
