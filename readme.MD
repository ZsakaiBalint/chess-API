
## Sakk API
![chessboard](https://media.wired.com/photos/5f592bfb643fbe1f6e6807ec/191:100/w_2400,h_1256,c_limit/business_chess_1200074974.jpg)
Ebben a repositoryban a szakdolgozati munkámat tárolom.  
A tesztek automatikusan lefutnak minden commitnál (github actions). 
***
**Fontosabb parancsok**  
npm start : elindítja magát a webes applikációt  
npm test  : lefuttatja a teszteket
***
A repository felépítése a következő:
* app.js: ebben a fileban van definiálva, hogy az api hogyan viselkedjen a HTTP GET hívásokra
* index.js: ebben a fileban a NodeJS webszerver található
* functions.js: az alkalmazás üzleti logikája, valamint minden sakk funkcionalitást megvalósító függvény itt található
* package.json: ez a file írja le a projektet, mint JavaScript csomagot, ebben vannak a terminálból indítható parancsok
* node_modules *mappa*: itt tárolódik minden kiegészítő csomagfájl, automatikusan jött létre
* package-lock.json: a kiegészítő csomagfájlok függőségi fáját ábrázolja, automatikusan jött létre
* \__test__ *mappa*: itt találhatók a tesztek
    * test.spec.js: ez a file tartalmazza a teszteseteket
* .github\workflows *mappa*
    * node.js.yml: ez a file felelős azért, hogy lefussanak githubon az automatikus tesztek

***
A felhasznált technológiák:
* NodeJS v16.16.0
* npm v8.11.0, a felhasznált JS csomagok:
    * express (https://www.npmjs.com/package/express) - az általam választott NodeJS keretrendszer
    * nodaemon (https://www.npmjs.com/package/nodaemon) - a szerver automatikus újraindítására szolgál
    * jest (https://www.npmjs.com/package/jest) - a sakk funkcionalitás tesztelésére szolgál (functions.js függvényei)
    * supertest (https://www.npmjs.com/package/supertest) - az endpoint tesztek futtatására szolgál (app.js függvényei)
