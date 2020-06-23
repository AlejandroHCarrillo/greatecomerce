# GreatEcomerce

Original github project course 
https://github.com/mosh-hamedani/organic-shop/tree/master/src/app/shopping

Breve resumen de como crear un CRUD con Firebase
https://dottedsquirrel.com/angular/how-to-crud-in-angular-firebase-firestore/

## Install firebase
npm install @angular/fire firebase --save

## install bootstrap
npm install bootstrap

## install ng-bootstrap
ng add @ng-bootstrap/ng-bootstrap

https://ng-bootstrap.github.io/#/getting-started



## installar angular 4 data table NO FUNCIONA CON ANGULAR 9

npm install angular-4-data-table --save

Production (Minification)
Some times this can cause problems.
To fix it use import like this

_**import { DataTableModule } from 'angular-4-data-table';**_

and for production build use

_**ng build --prod --aot=false**_

## instalar prime controls SI FUNCIONAN PERO CON LIMITACIONES
https://primefaces.org/primeng/showcase/#/setup
npm install primeng --save
npm install primeicons --save

npm install @angular/cdk --save
After upgrading to Angular 9 and PrimeNg 9 (rc.4), I get

ERROR in The target entry-point "primeng" has missing dependencies:

chart.js
after manually installing chart.js I get same error but with

quill
after installing quill I get same error with

@fullcalendar/core
Finally it then compiles.

If primeng needs these dependencies, then it should install them.

npm install chart.js --save
npm install quill --save

also remember to update your angular.json file:

"scripts": [
"node_modules/chart.js/dist/Chart.js"
"node_modules/quill/dist/quill.js"
]

## Instalar font Awesome
XXX npm install font-awesome --save

## Instalar font Awesome for Angular


https://www.npmjs.com/package/@fortawesome/angular-fontawesome
npm i @fortawesome/angular-fontawesome

ng add @fortawesome/angular-fontawesome[@6.14.5]

## How To Use Font Awesome icons in Angular Applications
https://www.angularjswiki.com/angular/how-to-use-font-awesome-icons-in-angular-applications/#global-level-configuration

## FontAwesome Icons in Angular 6?
https://stackoverflow.com/questions/52006605/fontawesome-icons-in-angular-6

## Autentificacion 

https://angular-templates.io/tutorials/about/firebase-authentication-with-angular


## twitter

El secreto para loguearse con twitter es: 
* Primero crear la cuenta developer en twitter
https://developer.twitter.com/en
* Crear una aplicacion en la cuenta de twitter
https://developer.twitter.com/en/apps
https://developer.twitter.com/en/apps/create

* Al crear la cuenta es muy importante definir el callbak como sigue: 
  https://greatecomerce.firebaseapp.com/__/auth/handler
* Copiar el **API Key** y el **API secret Key**   
* **En Firebase** habilitar la autentificacion por twitter
* Pegar el **API Key** y el **API secret Key** copiados anteriormente
* En esta pantalla, nos muestra que el call back debe ser: 
  https://greatecomerce.firebaseapp.com/__/auth/handler
  solo hay que cortarlo y pegarlo. cuando estemos creando o editando la cuenta app de twitter.


https://stackoverflow.com/questions/51103139/callback-url-not-approved-by-twitter




## Autentificacion con twitter
https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter


## Manejo de listas en firebase
https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md


## Querys y ordenamientos

https://github.com/angular/angularfire/blob/master/docs/rtdb/querying-lists.md


https://firebase.google.com/docs/database/web/lists-of-data#filtering_data 


Listas "Como mapear el payload"
https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md

## Validaciones personalizadas  - custom validations
https://angular.io/guide/attribute-directives
https://www.concretepage.com/angular-2/angular-4-min-max-validation

validators recomendados por el curso pero no funcionaron 
Instalar libreria
npm  install ng2-validation --save

Uso:

https://yuyang041060120.github.io/ng2-validation/index.html
https://github.com/yuyang041060120/ng2-validation

## Check the jQuery version using Console command (Chrome)
console.log(jQuery().jquery)

## Uso del switchMap
https://blog.angular-university.io/rxjs-switchmap-operator/

https://blog.angular-university.io/rxjs-higher-order-mapping/

https://www.concretepage.com/questions/634

## templates Angular
https://www.creative-tim.com/product/now-ui-dashboard-angular

## Localize error

Uncaught Error: It looks like your application or one of its dependencies is using i18n. Angular 9 introduced a global `$localize()` function that needs to be loaded. Please run `ng add @angular/localize` from the Angular CLI. (For non-CLI projects, add `import '@angular/localize/init';` to your `polyfills.ts` file. For server-side rendering applications add the import to your `main.server.ts` file.)

**ng add @angular/localize**
**import '@angular/localize/init';**

mas informacion (parece que no funciona): 

https://stackoverflow.com/questions/57953317/angular-9-introduced-a-global-localize-function-that-needs-to-be-loaded

You need to make sure you have the @angular/localize package first:

npm install @angular/localize --save

Then, import '@angular/localize/init' in your polyfills.ts file just like the error says



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
