---
title: Strona AmazedDeveloper.pl
description: Portfolio i Blog napisane w Gridsome - generatorze stron statycznych od Vue.JS, z dynamicznym kontentem wykorzystującym pliki Markdown. Prosty projekt, który przerodził się w osobista stronę.
ctime: 2019-09-20
published: true
design: https://www.figma.com/file/bHvgKRExK0xakvCdwLi6Iv9m/Portfolio?node-id=0%3A1
url: https://brave-shaw-f5e5a1.netlify.com
git: https://github.com/sebastianluszczek/amazed_developer
cover_img: /images/amazed-developer.png
tech: [vuejs, gridsome, markdown, SASS]
---

# Trochę więcej niż portfolio

Gdy znalazłem tutorial na youtube'ie pokazujący podstawy **Gridsome**, generatora stron statycznych dla **Vue.JS** pomyślałem o tym jako o ciekawej alternatywie dla SPA i standardowych statycznych stron internetowych. Dopiero gdy znalazłem artykuł, a następnie playliste youtube opisującą wtyczkę do Gridsoma [@gridsome/vue-remark](https://www.npmjs.com/package/@gridsome/vue-remark) pozwalającą na dużą elestyczność w pracy z plikami markdown i generowaniu na ich podstawie podstron, pomyślałem "to jest to!".
Tak powstał najpierw prosty boilerplate dla czegoś ala blog, który w miarę odkrywania tajników tej technologii przeradzał się w coraz większy projekt, by ostatecznie zakończyć jako pierwsze oficjalne portfolio z elementami osobistego bloga.

---

## Aplikacja korzysta z:

<div class="md_icons_wrapper">
<img src="/icons/vuejs.png" alt="Vue.js" class="md_icon">
<img src="/icons/gridsome.png" alt="Nuxt.js" class="md_icon">
<img src="/icons/markdown.png" alt="Markdown" class="md_icon">
<img src="/icons/SASS.png" alt="Sass" class="md_icon">
</div>

---

O ostatecznej decyzji użycia właśnie tych technologi w portfolio zaważyła późniejsza możliwość zbudowania wszystkiego jako bardzo dobrze zoptymalizowanej statycznej strony internetowej. Spodobał mi się pomysł umieszczenia całej apki na prostym hostingu jak [Netlify](https://netlify.com), bez martwienia się o backend i api dla blogu. Wszystko siedzi w plikach **.md**, a sam gridsom na podstawie pliku konfiguracyjnego buduje całe drzewo aplikacji z widokami i podstronami. Oprócz podstron dla bloga w ten sam sposób, z plików .md, generowane są podstrony dla poszczególny projektów w portfolio.

Na Gridsom'a padło również dlatego, ze mam sporo doświadczenia komercyjnego w pisaniu Single Page Aplications w **Vue**, a jednak poza tą otoczką generowania stron statycznych gridsome wewnątrz jest po prostu projektem w **Vue** z warstwą abstrakcji do pracy z danymi opartą na **GraphQL**!
