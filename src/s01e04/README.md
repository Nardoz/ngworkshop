## S01E04: "Hay que salir del agujero interior"

**_Previously on #ngworkshop_**

> Finalmente descubrimos la verdad tras {{ }}: la "magia" está en que cada uno de estos crea un watcher que entra en el digest loop (dirty checking). También hay watchers para la dirección contraria, es decir, vista->modelo. Además del $rootScope creado por ng-app, los controllers (además de otras directivas) también crean un scope. Esto puede llegar a ser tricky, hay que ser cuidadoso.

### Al barro, todos

Ya tenemos suficiente intro y know-how para crear una app básica. Se propone una app de ejemplo pero pueden trabajar sobre alguna idea propia, **lo importante es no adelantarse al grupo** => limítense a utilizar:

- controllers
- `$scope`
- formularios (`<input>`, `<select>`, `<button>`...)
- `ng-model`
- al menos una propiedad del modelo que sea un array
- `ng-repeat`

> @mgonto: y Restangular!

No, Gonto. Restangular todavía no, bancame la mecha.

Algunos tips:

- Browsear [la docu de referencia de Angular](http://docs.angularjs.org/api/) para encontrar ayuda sobre lo que necesiten, por ejemplo [select](http://docs.angularjs.org/api/ng/directive/select) y [ng-repeat](http://docs.angularjs.org/api/ng/directive/ngRepeat).

- Componentizar usando varios controllers cuando sea apropiado

- No preocuparse aún por persistencia, CTRL-R en el browser resetea todo => ok.

### Una app de ejemplo

Lista de miembros y su tecnología preferida.
