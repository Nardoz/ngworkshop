## S01E02: "Scopes"

[**_Previously on #ngworkshop_**](https://github.com/Nardoz/ngworkshop/tree/master/src/s01e01)

> `{{ }}` pareciera evaluar la expresión que contiene; es como si fuera un "shortcut" a `document.write` pero con algunas diferencias sutiles; sin embargo, nos dimos cuenta que el contexto de evaluación pareciera ser otro distinto al que estamos acostumbrados...

### El scope

El "**VM**" en "MV**_VM_**". DOM == V. Scope == VM. `ng-app` y el `$rootScope`. Acerca de `module.run()`. Inyección de dependencias.

```js
.run(function ($rootScope) {
    window.$rootScope = $rootScope;
});
```

Inspeccionemos $rootScope en la consola. Ahora asignemos un valor a `someText` en el scope, para comprobar el `{{ someText }}` del ejemplo anterior:

```js
$rootScope.someText = 'nardoz (from scope)';
```

Binding del Scope(VM) <==> DOM(V).

```html
<title>S01E02 | Nardoz {{ '#ngworkshop' }}</title>
```

Por qué? => está fuera del scope: recordemos que es ng-app quien crea el scope. "Ensanchemos" el scope de manera que `<title>` quede adentro:

```html
<html ng-app="hello">
...
<body>
```

### "Live binding"

```html
<p>{{ someDate }}</p>
```

```
$rootScope.someDate = new Date();
```

Cool! Probemos algo más cool todavía:

```js
.run(function ($rootScope, $interval) {
  $interval(function () {
    $rootScope.someDate = new Date();
  }, 1);
});
```

Model->View autosync magic FTW!

### [Próximo episodio >>](https://github.com/Nardoz/ngworkshop/tree/master/src/s01e03)
