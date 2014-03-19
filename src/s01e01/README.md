## S01E01: "Hello World" ##

### Configuración del proyecto ###

El entorno propuesto para empezar consiste de *NPM*, *Bower*, *Gulp* y *LiveReload*.

> @mgonto: y Restangular!

No Gonto, todavía no.

* **NPM**:
para dependencias de desarrollo (build, tests, server);

* **Bower**:
para dependencias de la aplicación (ej: angular);

* **Gulp**:
para automatizar el build y otras utilidades;

* **LiveReload**:
para refrescar el browser ante cualquier cambio en el código.

Un típico proyecto esqueleto, simple pero efectivo para prototipos ó kickstart liviano, es el siguiente (sin incluir por ahora lo relacionado a testing):

* `package.json`

* `bower.json`

* `Gulpfile.js` con tareas para levantar un web server, ruteo para soportar HTML5 mode (rutas sin hash) y livereload;

* `src/index.html`

* `src/app/{appname}.js`

Para automatizar este setup [me hice un script en bash](https://github.com/luisfarzati/ngstart) al que llamé `ngstart`. No es la gran cosa y está hecho para que funcione en Ubuntu. Para arrancar este workshop es suficiente.

Para instalar Bower y Gulp:

```
$ sudo npm install -g bower gulp
```

Para instalar LiveReload (para Chrome): https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei


### Creación del proyecto ###
```
$ ngstart --no-test workshop
```

> --no-test es para ignorar dependencias y configuraciones para testing que no vamos a necesitar por ahora.


Esto realiza las siguientes operaciones:

1. Crea un directorio `workshop` en el *current path*;
2. Clona el proyecto template;
3. `npm install` `--save-dev` `tiny-lr` `connect` `connect-modrewrite` `gulp` `gulp-livereload`
4. `bower install` `--save` `angular`
5. `gulp`

Al término del script, habrá un web server levantado en [localhost:3000](http://localhost:3000).


### Primeros pasos

Abrir `index.html`; acerca de `ng-app`. Template y `{{ }}`.

```
<p>{{ 'Hello' }}</p>
```

```
<p>{{ 1+1 }}</p>
```

```
<p>{{ ['nar', 'doz'].join('') }}</p>
```

Refrescar y notar flickering ==> Angular bootstrap.

Ok, o sea que `{{ }}` es básicamente un `document.write`? No.

```
<p><script>document.write({ title: 'ngworkshop' })</script></p>
<p>{{ { title: 'ngworkshop'} }}</p>
```

Ok, no big deal, `{{ }}` está haciendo stringify automático (ponele):

```
<p><script>document.write(JSON.stringify({ title: 'ngworkshop' }))</script></p>
```

Otra diferencia: nunca rompe por undefined properties:

```
<p><script>document.write({ title: 'ngworkshop' }.not.exists)</script></p>
<p>{{ { title: 'ngworkshop'}.not.exists }}</p>
```

Es {{ }} un eval? Parecido. La expresión es evaluada, efectivamente. Pero el contexto no es el mismo que `eval()`. Probemos lo siguiente:

```
<script>var someText = 'nardoz';</script>
<p><script>document.write(someText)</script></p>
<p>{{ someText }}</p>
```

```
<p><script>document.write(this.someText)</script></p>
<p>{{ this.someText }}</p>
```

WTF! Acabemos con esta farsa.

```
<p><script>document.write(this)</script></p>
<p>{{ this }}</p>
```
