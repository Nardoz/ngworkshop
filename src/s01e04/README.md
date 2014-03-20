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

Empecemos por la vista:

```
<table border="1">
  <tr>
    <th>Member</th>
    <th>Desktop OS</th>
    <th>Mobile OS</th>
  </tr>
</table>
```

Bindear un array a la tabla: `ng-repeat="item in array"`; expresión que se evalúa en el scope.

```
<tr ng-repeat="member in ['DiegoRam', 'Lufo']">
  <td>{{ member }}</td>
</tr>
```

Agregar controller/crear scope en el DOM apropiado. Por convención se utiliza el sufijo `Ctrl` para los controllers.

```
<table border="1" ng-controller="MembersListCtrl">
```

```
.controller('MembersListCtrl', function ($scope) {
    $scope.members = [];
});
```

Reemplazamos la colección hardcodeada por la propiedad del scope:

```
<tr ng-repeat="member in members">
  <td>{{ member.name }}</td>
  <td>{{ member.desktop }}</td>
  <td>{{ member.mobile }}</td>
</tr>
```

Probamos agregar items a la colección:

```
$scope.members = [
  { name: '@DiegoRam', desktop: 'OSX', mobile: 'Android' },
  { name: '@luisfarzati', desktop: 'Ubuntu', mobile: 'Android' }
];
```

Ahora creamos un form para poder agregar miembros. Por ahora agreguemos un solo campo, el del memberName.

```
<form ng-controller="MemberFormCtrl">
  <input type="text" ng-model="memberName" placeholder="Member">
  <button ng-click="addMember()">Add member</button>
</form>
```

```
.controller('MemberFormCtrl', function ($scope) {
    $scope.addMember = function () {
        $scope.members.push({ name: $scope.memberName });
    };
});
```

Probemos a ver qué tal anda. Ups:

```
TypeError: Cannot call method 'push' of undefined
```

`$scope.members` es undefined en el scope de `MemberFormCtrl`, cierto.

Ok, `members[]` debería ser accesible por ambos controllers. Qué tienen en común ambos controllers? Recordemos que sus scopes heredan del mismo parent: $rootScope.

```
.controller('MembersListCtrl', function ($rootScope) {
    $rootScope.members = [
      { name: '@DiegoRam', desktop: 'OSX', mobile: 'Android' },
      { name: '@luisfarzati', desktop: 'Ubuntu', mobile: 'Android' }
    ];
})

.controller('MemberFormCtrl', function ($rootScope, $scope) {
    $scope.addMember = function () {
        $rootScope.members.push({ name: $scope.memberName });
    };
});
```

Bien, ahi funciona. Pero estamos contaminando el $rootScope (que sería como contaminar el global object en JavaScript). Necesitamos otro artefacto donde persistir nuestro modelo compartido a los diferentes controllers de nuestra aplicación.

Pero antes tenemos que terminar el formulario. Probemos la app una vez más, agreguemos varios miembros y observemos el comportamiento porque en unos minutos vamos a necesitar razonar algo...

Ahora agreguemos 2 dropdown al formulario, uno para las marcas desktop y otro para mobile. Ya que estamos, vamos a refactorear un poco. En vez de utilizar 3 properties diferentes del $scope (`memberName`, `memberDesktop`, `memberMobile`) usemos `member` y ese objeto lo agregamos directamente al array.


```
.controller('MemberFormCtrl', function ($rootScope, $scope) {
    $scope.addMember = function () {
        $rootScope.members.push($scope.member);
    };
})

```

```
<input type="text" ng-model="member.name" placeholder="Member">
<select ng-model="member.desktop">
  <option>Ubuntu</option>
  <option>OSX</option>
  <option>Windows</option>
</select>
<select ng-model="member.mobile">
  <option>Android</option>
  <option>iOS</option>
</select>
```

Ok, probémoslo. Agreguemos un miembro. Ahora comencemos a agregar otro. WTF!

Este es otro tricky issue en el que uno cae con facilidad al principio.


```
.controller('MemberFormCtrl', function ($rootScope, $scope) {
    $scope.addMember = function () {
        $rootScope.members.push(angular.copy($scope.member));
    };
})

```

A todo esto, hay un detalle que falta: estaría bueno que el form se resetee cuando agregamos un miembro.

```
.controller('MemberFormCtrl', function ($rootScope, $scope) {
    $scope.addMember = function () {
        $rootScope.members.push(angular.copy($scope.member));
        delete $scope.member;
    };
})

```


Probemos inicializar valores por defecto en el form:

```
.controller('MemberFormCtrl', function ($rootScope, $scope) {
    $scope.addMember = function () {
        $rootScope.members.push(angular.copy($scope.member));
        delete $scope.member;
    };
    $scope.member = {
      desktop: 'Ubuntu',
      mobile: 'Android'
    };
})
```

Una mejor forma de usar `<select>` en los formularios es con `ng-options` => tarea!
