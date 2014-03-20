## S01E03: "$digest Loop"

[**_Previously on #ngworkshop_**](https://github.com/Nardoz/ngworkshop/tree/master/src/s01e02)

> Aprendimos sobre scopes y su relación con el DOM. Experimentando, descubrimos que Angular mantiene actualizada la vista *"todo el tiempo"*...

### Dirty checking

Inspeccionemos `$rootScope.$$watchers`. Qué está pasando en realidad: acerca del $digest loop.

1. *loop es triggereado por eventos dentro del contexto angular*
2. *revisión de la $watch list*
3. *si dirty, repite 2 a menos que llegue a 10 ciclos*
4. *aplica cambios en el DOM*

## 2-way databinding

```
<p><input ng-model="someText"> {{ someText }}</p>
```

`ng-model` se ocupa de bindear el input value al modelo, seteando un $watcher de la misma forma que `{{ }}` "watchea" al modelo.

```
$rootScope.someText = 'Hello World';
```


## Métodos en el scope

Se pueden agregar métodos en el scope para ser invocados desde la vista:

```
<button ng-click="alertSomething('hey ho!')">Shout</button>
```

```
$rootScope.alertSomething = function (message) {
  alert(message);
};
```

## Scope inheritance y DOM tree<->scope tree.

```
<p>{{ someText }} in scope {{ $id }}</p>
```

`ng-controller` => crea un scope que hereda del parent. Copiemos el `<p>` anterior y agreguémosle un controller:

```
<p ng-controller="TestCtrl">{{ someText }} in scope {{ $id }}</p>
```

```
.controller('TestCtrl', function ($scope) {
    window.$scope = $scope;
});
```

Vemos que los scopes tienen `$id` diferentes. Inspeccionemos `$scope`: es un child scope. No tiene someText, sin embargo se muestra el mismo valor => up the prototype chain. `$scope.$parent`.

Ahora asignemos un valor a `someText` dentro del controller:

```
$scope.someText = 'yo soy otro someText';
```

Volvamos a inspeccionar `$scope`. Recordar esto porque es medio tricky. Puede pasar este caso:

```
<p ng ng-controller="TestCtrl">{{ someText }} in scope {{ $id }}<br>
  <span ng-controller="ChildCtrl"><input ng-model="someText"> {{ someText }} in scope {{ $id }}</span>
</p>
```

```
app.controller('ChildCtrl', function ($scope) {});
```

Cuando cambiamos el valor desde el input, creamos un `someText` en el `ChildCtrl` en lugar de actualizar el padre. Si bien existe la posibilidad de que querramos esto, lo más probable es que no.

Solución:

```
<p ng ng-controller="TestCtrl">{{ obj.someText }} in scope {{ $id }}<br>
  <span ng-controller="ChildCtrl"><input ng-model="obj.someText"> {{ obj.someText }} in scope {{ $id }}</span>
</p>
```

```
app.controller('TestCtrl', function ($scope) {
  $scope.obj = { someText: 'nardoz' };
});
```

Ahora sí. Por eso es siempre una buena práctica referenciar propiedades dentro de un objeto para evitar confusiones.

Observar lo siguiente: estuvimos repitiendo referencias a controllers a lo largo del ejemplo, sin embargo el scope no es el mismo. Esto es importante: los controllers se pueden reusar, no así su `$scope`.

Relacionado a esto, tengamos en cuenta que, así como `ng-controller`, hay otras directivas que crean nuevos scopes:

```
<p ng ng-controller="TestCtrl">{{ someText }} in scope {{ $id }}<br>
  <span ng-if="true"><input ng-model="someText"> {{someText}} in scope {{ $id }}</span>
</p>
```

Ventajas de splitear scopes/crear varios controllers. Encapsulamiento de componentes de la vista.

### [Próximo episodio >>](https://github.com/Nardoz/ngworkshop/tree/master/src/s01e04)
